import { createApp } from "@/app"

export default context => {
    return new Promise(
        (resolve, reject) => {
            const { app, router } = createApp();
            const onReady = () => {
                const matchedComponents = router.getMatchedComponents();

                if (matchedComponents.length === 0) {
                    return reject({
                        code: 404
                    })
                }

                resolve(app);
            };

            context.meta = app.$meta();
            router.push(context.url);
            router.onReady(onReady, reject);
        }
    )
}
