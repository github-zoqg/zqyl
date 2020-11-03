  <template>
	<div>
		this is a demo
		<div class="home">
			<wx-open-launch-weapp id="launch-btn" username="gh_1cec6aa99e1f" path="pages/home/home.html">
				<!-- <script type="text/wxtag-template" id="wxbtn">
                    <button class="ant-btn ant-btn-red">{{ btnText }}"script"</button>
				</script>-->
				<template>
					<button class="ant-btn ant-btn-red .btn">open app</button>
					<!-- <button class="ant-btn ant-btn-red .btn" @click="test()">{{ btnText }}"template"</button> -->
				</template>
			</wx-open-launch-weapp>
			<!-- <a
				data-miniprogram-appid="wx5ba8812bdfc7741f"
				data-miniprogram-path="amouse_wxapp_card/pages/card/home/home"
				href="http://www.qq.com"
			>测试</a>-->
		</div>
		<div class="image">
			<van-dialog v-model="show" title="标题" show-cancel-button>
				<img src="../assets/gh_1cec6aa99e1f_1280 (1).jpg" rel="external nofollow" style="width:100%" />
			</van-dialog>
		</div>

		<!-- <input
			type="file"
			id="xFile2"
			capture="camera"
			multiple="multiple"
			accept="image/*"
			class="imgInp1"
			@change="onUpload2($event)"
		/>
		<input
			type="file"
			id="xFile"
			multiple="multiple"
			accept="image/*"
			class="imgInp1"
			@change="onUpload2($event)"
		/>
		<van-field name="uploader" label="文件上传">
			<template #input>
				<van-uploader
					v-model="uploader"
					:before-read="beforeRead"
					:after-read="afterRead"
					:before-delete="beforeDelete"
					:max-count="2"
					:max-size="2000 * 1024"
					@oversize="onOversize"
				/>
			</template>
		</van-field>

		<van-button type="primary">主要按钮</van-button>-->
	</div>
</template>

<script>
// import {Toast, Dialog, Notify} from 'vant'
// import { Button } from 'vant';
// api 接口从后端获取微信jsdk授权信息
//import wx from "weixin-js-sdk"; // 引入weixin JSDK
import sha1 from "sha1";
import { Toast } from "vant";
import Vue from "vue";

Vue.config.ignoredElements = ["wx-open-launch-weapp"];
export default {
	data() {
		return {
			username: "gh_1cec6aa99e1f", // gh_ 开头的原始小程序ID
			path: "pages/home/home.html", // 一定要以 .html 结尾
			btnText: "我的小程序",
			timestamp: 1598624937, // parseInt(new Date().setHours(0, 0, 0, 0)/1000),
			nonceStr: "Wm3WZYTPz0wzccnW",
			uploader: [],
			appid: "wxc2cf5ba7def5f042",
			show: "",
		};
	},
	methods: {
		async ToMiniapp() {
			let falg = false;
			console.log(localStorage.getItem("oldTime"));
			if (!localStorage.getItem("oldTime")) {
				localStorage.setItem("oldTime", new Date().getTime());
			}
			console.log(localStorage.getItem("oldTime"), 2);
			if (
				new Date().getTime() - localStorage.getItem("oldTime") >
				7200 * 1000
			) {
				falg = true;
			}
			console.log(
				new Date().getTime() - localStorage.getItem("oldTime"),
				falg
			);

			if (!localStorage.getItem("access_token") || falg) {
				await this.$axios
					.get("/cgi-bin/token", {
						params: {
							grant_type: "client_credential",
							appid: this.appid,
							secret: "1957b928cf2eb0af24fe60b41ad511f1",
						},
					})
					.then((res) => {
						console.log(res.data);
						localStorage.setItem(
							"access_token",
							res.data.access_token
						);
						localStorage.setItem("oldTime", new Date().getTime());
					});
			}
			if (localStorage.getItem("access_token")) {
				await this.$axios
					.get("/cgi-bin/ticket/getticket", {
						params: {
							access_token: localStorage.getItem("access_token"),
							type: "jsapi",
						},
					})
					.then((response) => {
						console.log(response);
						let str =
							"jsapi_ticket=" +
							response.data.ticket +
							"&noncestr=" +
							this.nonceStr +
							"&timestamp=" +
							this.timestamp +
							"&url=" +
							location.href.split("#")[0];
						// 签名
						console.log(str);
						let signature = sha1(str);
						console.log(signature);

						wx.config({
							debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印
							appId: this.appid, // 必填，公众号的唯一标识
							timestamp: this.timestamp, // 必填，生成签名的时间戳
							nonceStr: this.nonceStr, // 必填，生成签名的随机串(自己随意写)
							signature: signature, // 必填，签名
							jsApiList: ["scanQRCode"], // 必填，需要使用的JS接口列表
							openTagList: [
								"wx-open-launch-weapp",
								"wx-open-launch-app",
							], // 可选，需要使用的开放标签列表，例如['wx-open-launch-app']
						});

						let that = this;
						wx.ready(function (res) {
							// config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中
							console.log(res, "sha1成功");

							let localIds = "";
							// wx.chooseImage({
							// 	count: 1, // 默认9
							// 	sizeType: ["original", "compressed"], // 可以指定是原图还是压缩图，默认二者都有
							// 	sourceType: ["album", "camera"], // 可以指定来源是相册还是相机，默认二者都有
							// 	success: function (res) {
							// 		console.log(res);
							// 		localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
							// 	},
							// });
							// wx.uploadImage({
							// 	localId: localIds, // 需要上传的图片的本地ID，由chooseImage接口获得
							// 	isShowProgressTips: 1, // 默认为1，显示进度提示
							// 	success: function (res) {
							// 		var serverId = res.serverId; // 返回图片的服务器端ID
							// 	},
							// });
							wx.scanQRCode({
								needResult: 0, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
								scanType: ["qrCode", "barCode"], // 可以指定扫二维码还是一维码，默认二者都有
								success: function (res) {
									var result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
								},
							});
							// that.handleLaunchFn();
						});

						wx.error(function (res) {
							// config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名
							console.log(res);
						});
					});
			}
		},
		handleReady(e) {
			alert("aaa");
			console.log(e);
		},
		handleLaunchFn(e) {
			alert("ccc");
			console.log(e);
		},
		handleErrorFn(e) {
			alert("eee");
			console.log("fail", e.detail);
		},
		onUpload2(data) {
			console.log(data);
		},

		// 文件上传前处理
		beforeRead(file) {
			console.log(file);
			if (file.type.indexOf("image") == "-1") {
				Toast("请上传 jpg 格式图片");
				return false;
			}
			return true;
		},
		// 文件上传后处理
		afterRead(file) {
			console.log(file, "after");
			// if (file.type !== "image/jpeg") {
			// 	Toast("请上传 jpg 格式图片");
			// 	return false;
			// }
			return true;
		},
		// 文件删除前回调
		beforeDelete(file) {
			return true;
		},
		// 文件大小限制回调
		onOversize(file) {
			console.log(file);
			Toast("文件大小不能超过 2M");
		},
		test() {
			alert("点击按钮");
		},
	},
	async created() {
		// await this.ToMiniapp();
		let falg = false;
		console.log(localStorage.getItem("oldTime"));
		if (!localStorage.getItem("oldTime")) {
			localStorage.setItem("oldTime", new Date().getTime());
		}
		console.log(localStorage.getItem("oldTime"), 2);
		if (
			new Date().getTime() - localStorage.getItem("oldTime") >
			7200 * 1000
		) {
			falg = true;
		}
		console.log(
			new Date().getTime() - localStorage.getItem("oldTime"),
			falg
		);

		if (!localStorage.getItem("access_token") || falg) {
			await this.$axios
				.get("/cgi-bin/token", {
					params: {
						grant_type: "client_credential",
						appid: this.appid,
						secret: "1957b928cf2eb0af24fe60b41ad511f1",
					},
				})
				.then((res) => {
					console.log(res.data);
					localStorage.setItem("access_token", res.data.access_token);
					localStorage.setItem("oldTime", new Date().getTime());
				});
		}
		if (localStorage.getItem("access_token")) {
			await this.$axios
				.get("/cgi-bin/ticket/getticket", {
					params: {
						access_token: localStorage.getItem("access_token"),
						type: "jsapi",
					},
				})
				.then((response) => {
					console.log(response);
					let str =
						"jsapi_ticket=" +
						response.data.ticket +
						"&noncestr=" +
						this.nonceStr +
						"&timestamp=" +
						this.timestamp +
						"&url=" +
						location.href.split("#")[0];
					// 签名
					console.log(str);
					let signature = sha1(str);
					console.log(signature);

					wx.config({
						debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印
						appId: this.appid, // 必填，公众号的唯一标识
						timestamp: this.timestamp, // 必填，生成签名的时间戳
						nonceStr: this.nonceStr, // 必填，生成签名的随机串(自己随意写)
						signature: signature, // 必填，签名
						jsApiList: ["uploadImage", "chooseImage", "scanQRCode"], // 必填，需要使用的JS接口列表
						openTagList: [
							"wx-open-launch-weapp",
							"wx-open-launch-app",
						], // 可选，需要使用的开放标签列表，例如['wx-open-launch-app']
					});

					let that = this;
					wx.ready(function (res) {
						// config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中
						console.log(res, "sha1成功");

						// let localIds = "";
						// wx.chooseImage({
						// 	count: 1, // 默认9
						// 	sizeType: ["original", "compressed"], // 可以指定是原图还是压缩图，默认二者都有
						// 	sourceType: ["album", "camera"], // 可以指定来源是相册还是相机，默认二者都有
						// 	success: function (res) {
						// 		console.log(res);
						// 		localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
						// 	},
						// });
						// wx.uploadImage({
						// 	localId: localIds, // 需要上传的图片的本地ID，由chooseImage接口获得
						// 	isShowProgressTips: 1, // 默认为1，显示进度提示
						// 	success: function (res) {
						// 		var serverId = res.serverId; // 返回图片的服务器端ID
						// 	},
						// });
							wx.scanQRCode({
								needResult: 0, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
								scanType: ["qrCode", "barCode"], // 可以指定扫二维码还是一维码，默认二者都有
								success: function (res) {
									var result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
								},
							});
						// that.handleLaunchFn();
					});

					wx.error(function (res) {
						// config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名
						console.log(res);
					});
				});
		}
	},
	mounted() {
		// var btn = document.getElementById("launch-btn");
		// btn.innerHTML = document.getElementById("wxbtn").innerHTML;
		// console.log(btn);
		// btn.addEventListener("launch", function (e) {
		// 	alert("launch");
		// 	console.log("success");
		// });
		// btn.addEventListener("ready", function (e) {
		// 	alert("ready");
		// 	console.log("success");
		// });
		// btn.addEventListener("error", function (e) {
		// 	alert("error");
		// 	console.log("fail", e.detail);
		// });
	},
};
</script>
<style>
.ant-btn {
	line-height: 1.499;
	position: relative;
	display: inline-block;
	font-weight: 400;
	white-space: nowrap;
	text-align: center;
	background-image: none;
	border: 1px solid #d9d9d9;
	-webkit-box-shadow: 0 2px 0 rgba(0, 0, 0, 0.015);
	box-shadow: 0 2px 0 rgba(0, 0, 0, 0.015);
	cursor: pointer;
	-webkit-transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
	transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
	-webkit-user-select: none;
	-moz-user-select: none;
	-ms-user-select: none;
	user-select: none;
	-ms-touch-action: manipulation;
	touch-action: manipulation;
	height: 32px;
	padding: 0 15px;
	font-size: 14px;
	border-radius: 4px;
	color: rgba(0, 0, 0, 0.65);
	background-color: #fff;
}
.ant-btn-red {
	color: #fff;
	background-color: #ff5a44;
	border-color: #ff5a44;
	text-shadow: 0 -1px 0 rgba(0, 0, 0, 0.12);
	-webkit-box-shadow: 0 2px 0 rgba(0, 0, 0, 0.045);
	box-shadow: 0 2px 0 rgba(0, 0, 0, 0.045);
}
</style>