import { isEmpty } from "ramda";

export const getIpAddress = async () => {
    try {
        let ipAddress = '';

        if (isEmpty(ipAddress)) {
            const { ip } = await fetch('https://api.ipify.org/?format=json', {
                method: 'GET'
            }).then((res) => res.json());

            ipAddress = ip;
        }

        return ipAddress;
    } catch (error) {
        console.log(error);
        return null;
    }
    return null;
};