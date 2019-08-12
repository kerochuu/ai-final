import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/'

const POSTS = 'POSTS'
const PORTFOLIOS = 'PORTFOLIOS'
const WEBVIEWS = 'WEBVIEWS'
const USERS = 'USERS'
const COMMENTS = 'COMMENTS'
const COOKIES = 'COOKIES'

// Setup Firebase
const config = {
  projectId: 'project2-460cc',
  authDomain: 'project2-460cc.firebaseapp.com',
  apiKey: 'AIzaSyDxvusphBrkA8H1AzbmyzkGAquWow9opKM',
  databaseURL: 'https://project2-460cc.firebaseio.com',
  storageBucket: 'gs://project2-460cc.appspot.com',
  messagingSenderId: '207260346726'
}

firebase.initializeApp(config)
const firestore = firebase.firestore()
const storageRef = firebase.storage().ref().child('img')
const messaging = firebase.messaging()

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
		var getOption;
		if(navigator.onLine == false){
			getOption = {source: 'cache'};
		}
		// console.log(getOption);
		return postsCollection
			.orderBy('created_at', 'desc')
			.get(getOption)
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
	
	getPortfolios() {
		const postsCollection = firestore.collection(PORTFOLIOS)
		var getOption;
		if(navigator.onLine == false){
			getOption = {source: 'cache'};
		}
		// console.log(getOption);
		return postsCollection
			.orderBy('created_at', 'desc')
			.get(getOption)
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
		var getOption;
		if(navigator.onLine == false){
			getOption = {source: 'cache'};
		}
		// console.log(getOption);

		return postsCollection
			.where(firebase.firestore.FieldPath.documentId(), '==', id)
			.get(getOption)
			.then((docSnapshots) => {
				return docSnapshots.docs.map((doc) => {
					let data = doc.data()
					data.created_at = new Date(data.created_at.toDate())
					data.id = doc.id
					return data
				})
			})
	},
	getPortfolioComment(pid) {
		const comments = firestore.collection(PORTFOLIOS).doc(pid).collection(COMMENTS);
		return comments
		  .orderBy('created_at', 'desc')
		  .get()
		  .then((docSanpshots) => {
			return docSanpshots.docs.map((doc) => {
			  let data = doc.data()
			  data.created_at = new Date(data.created_at.toDate())
			  return data
			})
		  })
	  },
	   
  postPortfolio(title, body, img) {
    var portId = firestore.collection(PORTFOLIOS).doc().id;
    var doc = firestore.collection(PORTFOLIOS).doc(portId);
    return doc.set({
      portId: portId,
      viewCount: 0,
      title,
      body,
      img,
      created_at: firebase.firestore.FieldValue.serverTimestamp(),
      uid: firebase.auth().currentUser.email,
	})
		.then(() => {
			messaging.onMessage(payload => {
				var notificationTitle = 'Background Message Title';
				var notificationOptions = {
					body: 'Background Message body.'
				};
				return self.registration.showNotification(notificationTitle, notificationOptions);
			})
		})
  },

  addComment(pid, body) {
	var comments = firestore.collection(PORTFOLIOS).doc(pid).collection(COMMENTS);
	var uid = firebase.auth().currentUser;
	
	var cid = comments.doc().id;
	var commentId = firestore.collection(PORTFOLIOS).doc(pid).collection(COMMENTS).id;
	// alert("cid = " + cid + " , commentId = " + commentId);
	let email;
	let upw;
	if(uid == null) {
		// alert("게스트!!")
		email = "guest";
		upw = prompt("게스트로 댓글을 작성합니다... \n댓글삭제에 이용 할 비밀번호를 입력해주세요!", "passWord");
	//	alert(upw + " 비밀번호 등록!");
	} else {
		email = uid.email
		upw = null;
	}

	var commentId = firestore.collection(PORTFOLIOS).doc(pid).collection(COMMENTS).doc().id;
	var comment = firestore.collection(PORTFOLIOS).doc(pid).collection(COMMENTS).doc(commentId);
	return comment.set({
		commentId: commentId,
		body: body,
		uid: email,
		created_at: new Date(),
		password: upw
	})
	
  },
  updateComment(pid, body, cid, pw) {
	var uid = firebase.auth().currentUser;
	var comment = firestore.collection(PORTFOLIOS).doc(pid).collection(COMMENTS).doc(cid);
	let email;   
	let upw = null;
	
	if(uid == null) {
		email = "guest";
	//	alert("원래 비밀번호 -> " + pw);
		upw = prompt("비밀번호를 입력해주세요!", "passWord");
		if(pw == upw) {
			// alert(email+" 댓글수정!");
			var newBody = prompt("새로운 내용을 입력하세요!", body);
			var newUpw = prompt("새로운 비밀번호를 입력하세요!", upw);
			return comment.update({
				body:newBody,
				password:newUpw
			});
			
		} else {
			alert("비밀번호가 일치하지 않습니다!!");
		}
	} else {
		email = uid.email;
		// alert(email+" 회원 댓글수정!");
		var newBody = prompt("새로운 내용을 입력하세요!", body);
		return comment.update({
			body:newBody
		});
	}
  },
  deleteComment(pid, cid, pw) { 
	// alert("pid = " + pid + "  cid = " + cid);
	var uid = firebase.auth().currentUser;
	let email;
	let upw;
	if(uid == null) {
		email = "guest";
		// alert("원래 비밀번호 -> " + pw);
		upw = prompt("비밀번호를 입력해주세요!", "passWord");
		if(pw == upw) {
			alert(email+" 댓글삭제!")
			return firestore.collection(PORTFOLIOS).doc(pid).collection(COMMENTS).doc(cid).delete();
		} else {
			alert("비밀번호가 일치하지 않습니다!!")
		}
	} else {
		email = uid.email;
		alert(email+" 회원 댓글삭제!")
		return firestore.collection(PORTFOLIOS).doc(pid).collection(COMMENTS).doc(cid).delete();
	}
  },
  deleteCommentByAdmin(pid, cid) { 
	//alert("pid = " + pid + "  cid = " + cid);
	//alert("댓글삭제!");
	return firestore.collection(PORTFOLIOS).doc(pid).collection(COMMENTS).doc(cid).delete();
	
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
	async getUserData(userid) {
		return await firestore.collection(USERS).doc(userid).get()
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
					data.uid = doc.id
					data.created_at = new Date(data.created_at.toDate())
					return data
				})
			})
	},
	async getCookie(boolean) {
		return await firestore.collection(COOKIES).doc(boolean).get()
	},
	async updateCookie(boolean, data) {
		await firestore.collection(COOKIES).doc(boolean).set(data)
	},
	async getAllCookie() {
		return await firestore.collection(COOKIES).get()
	},
	spawnNotification(title, option) {
		var n = new Notification(title, option);
	}
}
