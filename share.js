export default {
    data() {
        return {
            // 设置默认的分享参数
            share: {
                title: '芒小购小程序分享',
                path: '/pages/index/index',
                imageUrl: '',
                desc: '',
                content: '',
            },
			// $imgUrl:'https://dev-file.ancai88.com:8071'
        };
    },
	onShareAppMessage(res) {
		try {
			if (res.from === 'button') { // 来自页面内分享按钮
			      console.log(res.target);
			    }
				console.log(this);
			return {
			    title: this.share.title,
			    path: this.share.path,
			    imageUrl: this.share.imageUrl,
			    desc: this.share.desc,
			    content: this.share.content,
			};
		} catch (e) {
			// TODO handle the exception
			console.log(e);
		}
    },
	onShareTimeline(res) {
	    return {
	        title: this.share.title,
	        path: this.share.path,
	        imageUrl: this.share.imageUrl,
	    };
	},
};
