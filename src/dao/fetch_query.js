import { MIKROWISP_API_URL, MIKROWISP_API_KEY } from "@env";
export async function fetch_query(service_name, data) {
    return new Promise((resolve, reject) => {
        fetch(MIKROWISP_API_URL + service_name, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                token: MIKROWISP_API_KEY,
                ...data,
            }),
        })
            .then((res) => res.json())
            .then((res) => {
                resolve(res);
            })
            .catch((err) => resolve(false));
    });
}
