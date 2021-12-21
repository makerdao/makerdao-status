import { useMemo } from 'react';
import { addressMap } from '../addresses/addresses';
import { getTokeNameFromIlkName } from '../addresses/addressesUtils';
import useLoadCalcContract from './useLoadCalcContract';
import useLoadClipperContract from './useLoadClipperContract';
import useLoadClipperMomContract from './useLoadClipperMomContract';
import useLoadDogContract from './useLoadDogContract';
import useLoadDssAutoLineContract from './useLoadDssAutoLineContract';
import useLoadDssPsmContract from './useLoadDssPsmContract';
import useLoadDSValueContract from './useLoadDSValueContract';
import useLoadJugContract from './useLoadJugContract';
import useLoadSpotContract from './useLoadSpotContract';
import useLoadVatContract from './useLoadVatContract';

const useLoadCollaterals = () => {
  const { vatMap, loading: vatLoading } = useLoadVatContract();
  const { jugMap, loading: jugLoading } = useLoadJugContract();
  const { spotMap, loading: spotLoading } = useLoadSpotContract();
  const { dssAutoLineMap, loading: dssAutoLineLoading } =
    useLoadDssAutoLineContract();
  const { clipperMap, loading: clipperLoading } = useLoadClipperContract();
  const { clipperMomMap, loading: clipperMomLoading } =
    useLoadClipperMomContract();
  const { dogMap, loading: dogLoading } = useLoadDogContract();
  const { dSValueMap, loading: dSValueLoading } = useLoadDSValueContract();
  const { dssPsmMap, loading: dssPsmLoading } = useLoadDssPsmContract();
  const { calcMap, loading: calcLoading } = useLoadCalcContract();
  const collaterals = useMemo(() => {
    const allIlks = Object.keys(addressMap.ILKS);
    return allIlks.map((ilk: string) => {
      const ilkTokenName = getTokeNameFromIlkName(ilk).replace('PSM-', '');
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const priceRwa = dSValueMap.get(`${ilk}--read`);
      return {
        id: `ilk-${ilk}`,
        token: ilkTokenName,
        vat_line: vatMap.get(`${ilk}--line`),
        vat_dust: vatMap.get(`${ilk}--dust`),
        jug_duty: jugMap.get(`${ilk}--duty`),
        spot_mat: spotMap.get(`${ilk}--mat`),
        dss_auto_line_line: dssAutoLineMap.get(`${ilk}--line`),
        dss_auto_line_gap: dssAutoLineMap.get(`${ilk}--gap`),
        dss_auto_line_ttl: dssAutoLineMap.get(`${ilk}--ttl`),
        clip_calc: clipperMap.get(`${ilk}--calc`),
        clip_cusp: clipperMap.get(`${ilk}--cusp`),
        clip_tail: clipperMap.get(`${ilk}--tail`),
        clip_chip: clipperMap.get(`${ilk}--chip`),
        clip_tip: clipperMap.get(`${ilk}--tip`),
        clip_buf: clipperMap.get(`${ilk}--buf`),
        clipMom_tolerance: clipperMomMap.get(`${ilk}--tolerance`),
        dog_chop: dogMap.get(`${ilk}--chop`),
        dss_pms_tin: dssPsmMap.get(`${ilk}--tin`),
        dss_pms_tout: dssPsmMap.get(`${ilk}--tout`),
        calc_cut: calcMap.get(`${ilk}--cut`),
        calc_step: calcMap.get(`${ilk}--step`),
      };
    });
  }, [
    clipperMap,
    clipperMomMap,
    dSValueMap,
    dogMap,
    dssAutoLineMap,
    dssPsmMap,
    jugMap,
    spotMap,
    vatMap,
    calcMap,
  ]);
  return {
    collaterals,
    loading:
      vatLoading ||
      spotLoading ||
      jugLoading ||
      dssAutoLineLoading ||
      clipperLoading ||
      clipperMomLoading ||
      dogLoading ||
      dSValueLoading ||
      dssPsmLoading ||
      calcLoading,
  };
};

export default useLoadCollaterals;
