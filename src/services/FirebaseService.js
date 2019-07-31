import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/'

const POSTS = 'POSTS'
const PORTFOLIOS = 'PORTFOLIOS'
const WEBVIEWS = 'WEBVIEWS'
const USERS = 'USERS'
const COMMENTS = 'COMMENTS'

// Setup Firebase
const config = {
	projectId: 'project2-460cc',
	authDomain: 'project2-460cc.firebaseapp.com',
	apiKey: 'AIzaSyDxvusphBrkA8H1AzbmyzkGAquWow9opKM',
	databaseURL: 'https://project2-460cc.firebaseio.com',
	storageBucket: 'gs://project2-460cc.appspot.com'

}


firebase.initializeApp(config)
const firestore = firebase.firestore()
const storageRef = firebase.storage().ref().child('img')

firebase.firestore().enablePersistence({experimentalTabSynchronization:true})
  .catch(function(err) {
      if (err.code == 'failed-precondition') {
          // Multiple tabs open, persistence can only be enabled
          // in one tab at a a time.
          // ...
      } else if (err.code == 'unimplemented') {
          // The current browser does not support all of the
          // features required to enable persistence
          // ...
      }
  });
firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)


export default {
	getPosts() {
		const postsCollection = firestore.collection(POSTS)

		return postsCollection
			.orderBy('created_at', 'desc')
			.get({source: 'cache'})
			.then((docSnapshots) => {
				return docSnapshots.docs.map((doc) => {
					let data = doc.data()
					data.created_at = new Date(data.created_at.toDate())
					return data  
				})
			})
	},
	postPost(title, body) {
		return firestore.collection(POSTS).add({
			title,
			body,
			created_at: firebase.firestore.FieldValue.serverTimestamp()
		})
	},
	deletePost(pid) {
		return firestore.collection(PORTFOLIOS).doc(pid).delete();
	},
	updateComment(pid, user) {
		return firestore.collection(PORTFOLIOS).doc(pid).add({
		})
	},
	getPortfolios() {
		const postsCollection = firestore.collection(PORTFOLIOS)
	  
		return postsCollection
			.orderBy('created_at', 'desc')
			.get({source: 'cache'})
			.then((docSnapshots) => {
				return docSnapshots.docs.map((doc) => {
					let data = doc.data()

					data.pid = doc.id
					data.created_at = new Date(data.created_at.toDate())
					return data
				})
			})
	},
	getPortfolioById(id) {
		const postsCollection = firestore.collection(PORTFOLIOS)
		return postsCollection
			.where(firebase.firestore.FieldPath.documentId(), '==', id)
			.get()
			.then((docSnapshots) => {
				return docSnapshots.docs.map((doc) => {
					let data = doc.data()
					data.created_at = new Date(data.created_at.toDate())
					data.id = doc.id
					return data
				})
			})
	},
	postPortfolio(title, body, img) {
		return firestore.collection(PORTFOLIOS).add({
			title,
			body,
			img,
			comments:[],
			commentsUid:[],
			created_at: firebase.firestore.FieldValue.serverTimestamp()
		})
	},
	loginWithGoogle() {
		let provider = new firebase.auth.GoogleAuthProvider()
		return firebase.auth().signInWithPopup(provider).then(function (result) {
			let accessToken = result.credential.accessToken
			let user = result.user
			return result
		}).catch(function (error) {
			console.error('[Google Login Error]', error)
		})
	},
	loginWithFacebook() {
		let provider = new firebase.auth.FacebookAuthProvider();
		return firebase.auth().signInWithPopup(provider).then(function (result) {
			let accessToken = result.credential.accessToken;
			let user = result.user
			console.log(user.uid)
			return result;
		}).catch(function (error) {
			console.error('[Facebook Login Error]', error);
		})
	},
	signupInFirebase(email, password, displayName, phoneNumber, photoURL) {
		firebase.auth().createUserWithEmailAndPassword(email, password)
			.then((user) => {
				const data = {
					authority: 'Visitor',
					displayName,
					phoneNumber,
					photoURL,
					email,
					created_at: firebase.firestore.FieldValue.serverTimestamp()
				}
				firestore.collection(USERS).doc(user.user.uid).set(data)
				alert("회원가입이 완료되었습니다.")
				window.location = "/"
				console.log(user)
			})
			.catch((error) => {
				alert("회원가입에 실패하였습니다.")
				console.log(error)
			})
	},
	signout() {
		firebase.auth().signOut()
	},
	signinFirebase(email, password) {
		return firebase.auth().signInWithEmailAndPassword(email, password)
			.catch((error) => {
				alert('로그인에 실패하였습니다.\nID와 비밀번호를 확인하여 주세요.')
			})
	},
	getUserInfo() {
		const user = firebase.auth().currentUser
		return user
	},
	posterUpload(file) {
		return new Promise(function (resolve, reject) {
			var timestamp = new Date().getTime().toString();
			var uploadTask = storageRef.child(timestamp + file.name).put(file);
			/*.then(function (snapshot) {
				console.log('Uploaded a blob or file!');
			});*/
			// Register three observers:
			// 1. 'state_changed' observer, called any time the state changes
			// 2. Error observer, called on failure
			// 3. Completion observer, called on successful completion
			var imgURL = '';
			uploadTask.on('state_changed', function (snapshot) {
				// Observe state change events such as progress, pause, and resume
				// Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
				var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
				console.log('Upload is ' + progress + '% done');
				switch (snapshot.state) {
					case firebase.storage.TaskState.PAUSED: // or 'paused'
						console.log('Upload is paused');
						break;
					case firebase.storage.TaskState.RUNNING: // or 'running'
						console.log('Upload is running');
						break;
				}
			}, function (error) {
				// Handle unsuccessful uploads
			}, function () {
				// Handle successful uploads on complete
				// For instance, get the download URL: https://firebasestorage.googleapis.com/...
				uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
					console.log('File available at', downloadURL);
					resolve(downloadURL);
				});
			});
		});
     },
	postImage(imgLink) {
		const user = firebase.auth().currentUser
		user.updateProfile({
			i: 'Visitor',
			photoURL: imgLink
		})
	},
	addPageLog(id) {
		const date = window.Date().slice(4, 15)
		const time = window.Date()
		let path = window.location.href
		const datas = firestore.collection(WEBVIEWS).doc(date)
		datas.get().then((doc) => {
			if (doc.exists) {
				if (doc.data()[time]) {
					const temp = {}
					const len = Object.keys(doc.data()[time]).length
					const temp1 = {
						path,
						userId: id
					}
					const temp2 = doc.data()[time]
					temp2[len] = temp1
					temp[time] = temp2
					datas.update(temp)
				} else {
					const temp = {}
					const temp1 = {
						path,
						userId: id
					}
					const temp2 = {}
					temp2[0] = temp1
					temp[time] = temp2
					datas.update(temp)
				}
			} else {
				const temp = {}
				const temp1 = {
					path,
					userId: id
				}
				const temp2 = {}
				temp2[0] = temp1
				temp[time] = temp2
				datas.set(temp)
			}
		})
	},
	changeAuthority(user, authority) {
		const data = { 'authority': authority }
		firestore.collection(USERS).doc(user.uid).update(data)
	},
	async getUserAuthority(userid) {
		return await firestore.collection(USERS).doc(userid).get()
	},
	getUserData() {
		
	},
	async getUserDatabyQuery(query, data) {
		return await firestore.collection(USERS).where(query, '==', data).get()
	},
	getAllUserData() {
		const usersCollection = firestore.collection(USERS)
		return usersCollection
			.orderBy('created_at', 'asc')
			.get()
			.then((docSnapshots) => {
				return docSnapshots.docs.map((doc) => {
					let data = doc.data()
					data.created_at = new Date(data.created_at.toDate())
					console.log(data)
					return data
				})
			})
	},
}
