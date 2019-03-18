export default function ({ $axios, store }) {
    $axios.onRequest(config => {
        const { accessToken } = store.state.user.credentials;

        config.headers.common['Authorization'] = `Bearer ${accessToken}`;
    })
}
