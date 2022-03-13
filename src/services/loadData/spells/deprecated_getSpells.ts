import { MakerClass } from '@makerdao/dai/dist/Maker';

const getSpells = async (
  address: string,
  maker: MakerClass,
): Promise<Definitions.SpellData> => {
  const [
    done,
    nextCastTime,
    eta,
    expiration,
    datePassed,
    dateExecuted,
    mkrSupport,
    executiveHash,
    officeHours,
  ] = await Promise.all([
    maker
      .service('spell')
      .getDone(address)
      .catch(() => undefined), // this fails if the spell doesn't have the right ABI,
    maker
      .service('spell')
      .getNextCastTime(address)
      .catch(() => undefined),
    maker
      .service('spell')
      .getEta(address)
      .catch(() => undefined),
    maker
      .service('spell')
      .getExpiration(address)
      .catch(() => undefined),
    maker
      .service('spell')
      .getScheduledDate(address)
      /* tslint:disable:no-empty */
      .catch(() => undefined), // this fails if the spell has not been scheduled
    maker
      .service('spell')
      .getExecutionDate(address)
      /* tslint:disable:no-empty */
      .catch(() => undefined), // this fails if the spell has not been executed
    maker.service('chief').getApprovalCount(address),
    maker
      .service('spell')
      .getExecutiveHash(address)
      .catch(() => undefined),
    maker
      .service('spell')
      .getOfficeHours(address)
      .catch(() => undefined),
  ]);

  return {
    address,
    hasBeenCast: done,
    hasBeenScheduled: !!eta,
    eta,
    expiration,
    nextCastTime,
    datePassed,
    dateExecuted,
    mkrSupport: mkrSupport.toBigNumber().toString(),
    executiveHash,
    officeHours,
  };
};

export default getSpells;
