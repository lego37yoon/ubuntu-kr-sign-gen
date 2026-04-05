<script lang="ts">
	import hljs from "highlight.js/lib/core";
	import xml from "highlight.js/lib/languages/xml";
	import "highlight.js/styles/atom-one-light.min.css"

	hljs.registerLanguage("xml", xml);

	let name_kr = $state("");
	let name_en = $state("");
	let title = $state("");
	let phone = $state("");
	let email = $state("");
	let gpg = $state("");
	let clipboard_icon = $state("p-icon--copy");

	let sign = $state("");

	function generator(name_kr, name_en, title, phone, email, gpg) {
		sign = `<div style="font-family: system-ui; line-height: 16px !important; font-size: 14px;"><br><table style="width: 100%; border-collapse: collapse;"><tbody><tr><td style="width: 100px; border: 0px; height: 87.4451px;"><img src="https://raw.githubusercontent.com/ubuntu-kr/logo-artworks/main/UbuntuKrCircleTag_w100.png" style="display: block; margin: 5px 0px; text-align: left; width: 74px;"></td><td style="border: 0px solid rgb(221, 221, 221); padding: 3px 4px 2px; height: 87.4451px; vertical-align: middle;"><strong id="nameOrg" style="font-size:13px;color:#000;letter-spacing:-1px;">${name_kr}</strong><span id="nameEng" style="font-size:11px;color:#000;">&nbsp;${name_en}</span><br><span id="department" style="font-size:11px;color:#000;">${title} of Ubuntu Korea Community</span><div id="contactInfo" style="color:#7d7d7d;margin-top:7px;"><span style="font-size:11px;line-height:14px;color:#999;"><span style="font-weight:bold; color:#616161;">Mobile</span> <span style="font-size:11px; color:#7d7d7d;">${phone}&nbsp;</span></span><br><span style="font-size:11px;color:#999;"><span style="font-weight:bold; color:#616161;">Email</span>&nbsp; <span style="font-size:11px; color:#999;"><a href="mailto:${email}" target="_blank">${email}</a></span></span><br><span style="font-size:11px;line-height:14px;color:#999;">${gpg}</span></div></td></tr></tbody></table></div>`;
	}

	async function copyCode(text: string) {
		try {
			await navigator.clipboard.writeText(text);
			clipboard_icon = "p-icon--success";

			setTimeout(() => {
				clipboard_icon = "p-icon--copy";
			}, 2000)
		} catch (error) {
			console.error(error.message);
			clipboard_icon = "p-icon--error";
		}
	}
</script>

<svelte:head>
	<title>서명 생성기 - 우분투한국커뮤니티</title>
</svelte:head>

<section class="grid-col">
	<h1>이메일 서명 생성기</h1>
	<p><a href="https://discourse.ubuntu-kr.org/t/topic/50021">운영진 위키의 서명 적용 항목</a>으로 돌아가 서명을 적용하실 수 있습니다</p>
</section>

<section class="grid-row--50-50">
	<form
		class="form grid-col"
		onsubmit={(event) => {
			event.preventDefault();
			generator(name_kr, name_en, title, phone, email, gpg)
		}}
	>
		<div class="form-group">
			<label for="name_kr">이름</label>
			<input
				bind:value={name_kr}
				name="name_kr"
				type="text"
				required
				placeholder="이름"
			/>
		</div>
		<div class="form-group">
			<label for="name_en">영문 이름</label>
			<input
				bind:value={name_en}
				name="name_en"
				type="text"
				required
				placeholder="영문 이름"
			/>
		</div>
		<div class="form-group">
			<label for="title">직책</label>
			<input
				bind:value={title}
				name="title"
				type="text"
				required
				placeholder="직책"
			/>
		</div>
		<div class="form-group">
			<label for="phone">휴대폰 번호</label>
			<input
				bind:value={phone}
				name="phone"
				type="tel"
				required
				placeholder="휴대폰 번호"
			/>
		</div>
		<div class="form-group">
			<label for="email">메일 주소</label>
			<input
				bind:value={email}
				name="email"
				type="email"
				required
				placeholder="메일 주소"
			/>
		</div>
		<div class="form-group">
			<label for="gpg">GPG 키</label>
			<input
				bind:value={gpg}
				name="gpg"
				type="text"
				required
				placeholder="gpg 키"
			/>
		</div>
		<button type="submit">생성</button>
	</form>
	<div class="grid-col">
		<div class="p-card">
			<h2>서명 코드</h2>
			<div class="result p-card__content p-code-snippet">
				<pre class="p-code-snippet__block"><code>{@html hljs.highlight(sign, { language: "XML" }).value}</code></pre>
				<button class="p-button--base has-icon" type="button" aria-label="복사하기" onclick={() => copyCode(sign)}>
					<i class={clipboard_icon}></i>
				</button>
			</div>
		</div>
		<div class="p-card preview-card">
			<h2>미리보기</h2>
			<div id="preview" class="preview-box p-card__content">
				{@html sign}
			</div>
		</div>
	</div>
</section>
<style>
	.result {
		display: flex;
		gap: 0.5rem;
	}

	.result button {
		width: max-content;
		height: max-content;
	}

	.result pre {
		border-radius: 0.5em;
		padding: 1em;
		font-size: 0.95em;
		width: 100%;
		overflow-x: auto;
		text-wrap: wrap;
		max-height: 10rem;
	}

	.preview-box {
		padding: 10px;
		min-height: 120px;
		max-height: 300px;

		background: #fff;
		color: #222;
		border: 1px solid #ddd;
	
		overflow-y: auto;
	}
</style>
