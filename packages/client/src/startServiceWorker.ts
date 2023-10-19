export function startServiceWorker() {
    if (location.hostname === "localhost") {
        return;
    };
    if ("serviceWorker" in navigator) {
        window.addEventListener("load", () => {
            navigator.serviceWorker.register("./sw.js", { type: 'module' }).then(registration => {
                console.log("ServiceWorker registration successful with scope: ", registration.scope);
            }).catch((error: string) => {
                console.log("ServiceWorker registration failed: ", error);
            });
        });
    }
}
