import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const POSTS = 'POSTS'
const PORTFOLIOS = 'PORTFOLIOS'
const WEBVIEWS = 'WEBVIEWS'

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

firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)

export default {
	getPosts() {
		const postsCollection = firestore.collection(POSTS)
		return postsCollection
			.orderBy('created_at', 'desc')
			.get()
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
	getPortfolios() {
		const postsCollection = firestore.collection(PORTFOLIOS)
		return postsCollection
			.orderBy('created_at', 'desc')
			.get()
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
			return result;
		}).catch(function (error) {
			console.error('[Facebook Login Error]', error);
		})
	},
	signupInFirebase(email, password) {
		firebase.auth().createUserWithEmailAndPassword(email, password)
			.then((user) => {
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
	},
	getUserInfo() {
		const user = firebase.auth().currentUser
		return user
	},

	postImage(imgLink) {
		const user = firebase.auth().currentUser
		user.updateProfile({
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
	}
}
