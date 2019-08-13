const functions = require('firebase-functions');
exports.newComment = functions.firestore.document('comment/{documentId}').onCreate((snap, context) => {
    const newValue = snap.data();
    const key = 'AAAAMEGt6WY:APA91bGYzHueKCzlCKDxg0OID0i1tWy0e-UsfTRIBygT5cjE2HJFpKfRSfSHtooex7LXZh1d1lTc-eKWg7S_0BZRIFtCH4I3YEmKlEYYpCJK-MRK58xa5uHIp6jARmqVa3R5WJ8YCXj8';
    var notification = {
        'title': newValue.writer + '님이 댓글을 작성하셨습니다',
        'body': 'Title : ' + newValue.text,
    };
    let list = []
    let cnt = 0
    firestore.collection(POSTS).doc(newValue.portfolioId)
        .get()
        .then((doc) => {
            if (doc.exists) {
                fcmToken = doc.data().fcmToken;
                list[cnt++] = doc.data().fcmToken
                return notify(key, notification, list);
            } else {
                return;
            }
        })
        .catch((err) => {
            console.log(err);
        })
    firestore.collection(PORTFOLIOS).doc(newValue.portfolioId)
        .get()
        .then((doc) => {
            if (doc.exists) {
                fcmToken = doc.data().fcmToken;
                list[cnt++] = doc.data().fcmToken
                return notify(key, notification, list);
            } else {
                return;
            }
        })
        .catch((err) => {
            console.log(err);
        })
})
exports.newPost = functions.firestore.document('posts/{documentId}').onCreate((snap, context) => {
    const newValue = snap.data();
    const key = 'AAAAMEGt6WY:APA91bGYzHueKCzlCKDxg0OID0i1tWy0e-UsfTRIBygT5cjE2HJFpKfRSfSHtooex7LXZh1d1lTc-eKWg7S_0BZRIFtCH4I3YEmKlEYYpCJK-MRK58xa5uHIp6jARmqVa3R5WJ8YCXj8';
    const notification = {
        'title': newValue.displayName + '님이 Post를 작성하셨습니다',
        'body': 'Title : ' + newValue.title,
        'click_action' : 'https://webproject-myblog.firebaseapp.com',
    };
    let list = []
    let cnt = 0
    const subScriberCollection = firestore.collection(SUBSCRIBER)
    return subScriberCollection
        .get()
        .then((docSnapshots) => {
            docSnapshots.docs.map((doc) => {
                let snapData = doc.data()
                if (newValue.fcmToken !== snapData.token) {
                    list[cnt++] = snapData.token;
                }
                return;
            })
            return notify(key, notification, list)
        })
});
exports.newPortfolio = functions.firestore.document('portfolios/{documentId}').onCreate((snap, context) => {
    const newValue = snap.data();
    const key = 'AAAAMEGt6WY:APA91bGYzHueKCzlCKDxg0OID0i1tWy0e-UsfTRIBygT5cjE2HJFpKfRSfSHtooex7LXZh1d1lTc-eKWg7S_0BZRIFtCH4I3YEmKlEYYpCJK-MRK58xa5uHIp6jARmqVa3R5WJ8YCXj8';
    const notification = {
        'title': newValue.displayName + '님이 Portfolio를 작성하셨습니다',
        'body': 'Title : ' + newValue.title,
    };
    let list = []
    let cnt = 0
    const subScriberCollection = firestore.collection(SUBSCRIBER)
    return subScriberCollection
        .get()
        .then((docSnapshots) => {
            docSnapshots.docs.map((doc) => {
                let snapData = doc.data()
                if (newValue.fcmToken !== snapData.token) {
                    list[cnt++] = snapData.token;
                }
                return;
            })
            return notify(key, notification, list)
        })
});
function notify(key, notification, list) {
    axios({
        url: 'https://fcm.googleapis.com/fcm/send',
        method: 'POST',
        headers: {
            'Authorization': 'key=' + key,
            'Content-Type': 'application/json'
        },
        data: JSON.stringify({
            'notification': notification,
            'registration_ids': list
        })
    })
        .then(response => {
            console.log("성공~")
            return response
        })
        .catch(error => {
            console.log("실패~")
            return error
        })
}