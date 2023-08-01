
<script>
	import permission from "permission.js";
	import api from "./api/api.js"

	export default {
		onLaunch() {
			permission();
		},
		globalData: {
			...api
		}
	}
</script>

<style lang="scss">	
	@import "@/uni_modules/uview-ui/index.scss";
	/*每个页面公共css */
</style>