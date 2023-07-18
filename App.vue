
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

<style>	
	/*每个页面公共css */
</style>