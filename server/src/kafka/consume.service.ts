import { Injectable } from '@nestjs/common'
import { SubscribeTo, SubscribeToFixedGroup } from './decorator/kafka.decorator'
import { KafkaPayload } from './kafka.message'
import { InjectModel } from '@nestjs/mongoose'
import { User } from 'src/user/schemas/user.schema'
import { Model } from 'mongoose'
// import { HELLO_FIXED_TOPIC } from '../constant';
export const HELLO_TOPIC = 'hello.topic'
export const HELLO_FIXED_TOPIC = 'hello.fixed.topic'

@Injectable()
export class ConsumerService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}
  /**
   * When group id is unique for every container.
   * @param payload
   */
  @SubscribeTo('hello.topic')
  async helloSubscriber(payload: KafkaPayload) {
    const user = new this.userModel(payload.body)
    await user.save()
    console.log(user)
  }

  /**
   * When application or container scale up &
   * consumer group id is same for application
   * @param payload
   */
  @SubscribeToFixedGroup(HELLO_FIXED_TOPIC)
  helloSubscriberToFixedGroup(payload: KafkaPayload) {
    console.log(
      '[KAKFA-CONSUMER] Print message after receiving for fixed group',
      payload
    )
  }

  /**
   * When group id is unique for every container.
   * @param payload
   */
  @SubscribeTo('hello.topic2')
  helloSubscriber2(payload: KafkaPayload) {
    console.log('[KAKFA-CONSUMER] Print message after receiving', payload)
  }
}
