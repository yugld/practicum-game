export function notifyUser(text: string) {
    if (!("Notification" in window)) {
        console.log('Notifications are not supported.');
    } else if (Notification.permission === 'granted') {
        showNotification(text);
    } else if (Notification.permission !== 'denied') {
        Notification.requestPermission().then((permission) => {
            if (permission === 'granted') {
                showNotification(text);
            }
        });
    }
}

function showNotification(text: string) {
    const notification = new Notification(text);
    setTimeout(notification.close.bind(notification), 3000);
}
