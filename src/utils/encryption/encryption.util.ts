import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import errorsEnum from '../../enum/errors.enum';

@Injectable()
export class EncryptionUtil {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  async Decrypt(str: string): Promise<string> {
    try {
      const salt = await bcrypt.genSalt();
      return await bcrypt.hash(str, salt);
    } catch (e) {
      throw new Error(errorsEnum.INTERNAL_SERVER);
    }
  }
}
