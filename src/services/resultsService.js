import axios from "axios";
import config from '../config';
import data from '../test_data/dist__hits_gte30_blastn_out_06000_GB_111.bam_vs_nt_output';

const getData = (resp) => {
    const wrapper = resp.data || {};
    const data = wrapper.data || {};
    return data;
};
const parseResp = (resp) => {
    const payload = resp.data || {};
    return payload;
};

/**
 * Sends service call to retrieve all the results from swabNseq
 */
export function getAllResults() {
    /* MOCK DATA - TODO: REMOVE */
    return new Promise((resolve) => { resolve(data.all) })
        .then(resp => {return parseResp(resp) })
        .catch(console.log);
    return axios
        .get(config.service + '/results')
        .then(resp => { return parseResp(resp) })
        .catch(console.log);
}

/**
 * Sends service call to retrieve the individual results
 */
export const getRecordResults = (id) => {
    /* MOCK DATA - TODO: REMOVE */
    return new Promise((resolve) => { resolve(data.selected) })
        .then(parseResp)
        .catch(console.log);
    return axios.get(`${config.service}/record?id=${id}`)
        .then(parseResp)
        .catch(console.log)
};
