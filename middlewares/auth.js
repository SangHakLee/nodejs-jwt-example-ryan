// 매번 토큰을 검증하는 check() 로직을 수행할 수 없으니 중간에 미들웨어를 둔다.
// 라우터단으로 들오기 전에 미들웨어를 통해 jwt를 검증하고 라우터로 보낸다.

const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {

	const token = req.headers['x-access-token'] || req.query.token;
	if ( !token ) {
		return res.status(403).json({
			success : false,
			message : 'Login first'
		});
	}

	const promise = new Promise( (resolve, reject) => {
		jwt.verify(
			token,
			req.app.get('jwt-secret'),
			(err, decodeed) => {
				if ( err ) reject(err);
				resolve(decodeed);
			}
		);
	});

	const onError = (error) => {
		res.status(403).json({
			success : false,
			message : error.message
		});
	};

	promise
	.then( (decodeed) => {
		req.decodeed = decodeed;
		next();
	})
	.catch(onError);
};

module.exports = authMiddleware;
