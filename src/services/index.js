import { loadMisc } from "./loadMisc"

export const loadData=async (setState)=>{
    const miscData=await loadMisc
    setState({
        ...miscData
    })
}