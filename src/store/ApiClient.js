
/*========================================================
    * function Name: requestApiClient
    * function Purpose: check api calling is valid
    * function Parameters: method, baseURL, url, data, headers
    * function ReturnType: data and status
    * function Description: requestApiClient method api calling using fetch 
    *=====================================================*/

/**
 * @typedef {Object} ApiClientRequestConfig
 * @prop {string} [method]
 * @prop {string} url
 * @prop {string | FormData} [data]
 * @prop {{ [header: string]: string }} [headers]
 *
 * @typedef {Object} ApiClientResponse
 * @prop {*} data
 * @prop {number} status
 */

export default class ApiClient {
    /** @param {{ baseURL: string }} config */
    constructor({ baseURL }) {
        this.config = { baseURL };
    }

    /**
     * @param {ApiClientRequestConfig} config
     * @returns {Promise<ApiClientResponse>}
     */

    async requestApiClient(config) {

        const { method, baseURL, url, data, headers } = {
            ...this.config,
            ...config,
        };

        let fetchUrl = `${baseURL}${url}`;
        let fetchResponse = await fetch(fetchUrl, {
            method: method,
            headers: headers,
            body: JSON.stringify(data)
        });

        let response = await fetchResponse.json();
        console.log('api fetchResponse >>>>>>>>>>', response)

        return {
            data: response,
            status: fetchResponse.status,
        };
    }
}
