import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class EncryptionUtil {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  async Decrypt(str: string): Promise<string> {
    const salt = await bcrypt.genSalt();
    return await bcrypt.hash(str, salt);
  }
}
