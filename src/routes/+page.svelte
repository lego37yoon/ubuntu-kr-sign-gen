<script>
	let name_kr = "";
	let name_en = "";
	let title = "";
	let phone = "";
	let email = "";
	let gpg = "";

	let sign = "";

	function generator(name_kr, name_en, title, phone, email, gpg) {
		sign = `<div style="font-family: system-ui; line-height: 16px !important; font-size: 14px;"><br><table style="width: 100%; border-collapse: collapse;"><tbody><tr><td style="width: 100px; border: 0px; height: 87.4451px;"><img src="https://raw.githubusercontent.com/ubuntu-kr/logo-artworks/main/UbuntuKrCircleTag_w100.png" style="display: block; margin: 5px 0px; text-align: left; width: 74px;"></td><td style="border: 0px solid rgb(221, 221, 221); padding: 3px 4px 2px; height: 87.4451px; vertical-align: middle;"><strong id="nameOrg" style="font-size:13px;color:#000;letter-spacing:-1px;">${name_kr}</strong><span id="nameEng" style="font-size:11px;color:#000;">&nbsp;${name_en}</span><br><span id="department" style="font-size:11px;color:#000;">${title} of Ubuntu Korea Community</span><div id="contactInfo" style="color:#7d7d7d;margin-top:7px;"><span style="font-size:11px;line-height:14px;color:#999;"><span style="font-weight:bold; color:#616161;">Mobile</span> <span style="font-size:11px; color:#7d7d7d;">${phone}&nbsp;</span></span><br><span style="font-size:11px;color:#999;"><span style="font-weight:bold; color:#616161;">Email</span>&nbsp; <span style="font-size:11px; color:#999;"><a href="mailto:${email}" target="_blank">${email}</a></span></span><br><span style="font-size:11px;line-height:14px;color:#999;">${gpg}</span></div></td></tr></tbody></table></div>`;
	}
</script>

<div class="container">
	<div class="card">
		<h1>이메일 서명 생성기</h1>
		<form
			class="form"
			on:submit|preventDefault={() =>
				generator(name_kr, name_en, title, phone, email, gpg)}
		>
			<div class="form-group">
				<label>이름</label>
				<input
					bind:value={name_kr}
					type="text"
					required
					placeholder="이름"
				/>
			</div>
			<div class="form-group">
				<label>영문 이름</label>
				<input
					bind:value={name_en}
					type="text"
					required
					placeholder="영문 이름"
				/>
			</div>
			<div class="form-group">
				<label>직책</label>
				<input
					bind:value={title}
					type="text"
					required
					placeholder="직책"
				/>
			</div>
			<div class="form-group">
				<label>휴대폰 번호</label>
				<input
					bind:value={phone}
					type="tel"
					required
					placeholder="휴대폰 번호"
				/>
			</div>
			<div class="form-group">
				<label>메일 주소</label>
				<input
					bind:value={email}
					type="email"
					required
					placeholder="메일 주소"
				/>
			</div>
			<div class="form-group">
				<label>GPG 키</label>
				<input
					bind:value={gpg}
					type="text"
					required
					placeholder="gpg 키"
				/>
			</div>
			<button class="submit-btn" type="submit">생성</button>
		</form>
		<div class="result">
			<label>서명 코드</label>
			<pre>{sign}</pre>
		</div>
	</div>
	<div class="card preview-card">
		<h2>미리보기</h2>
		<div id="preview" class="preview-box">
			{@html sign}
		</div>
	</div>
</div>

<style>
	.container {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 20px;
		font-family: Arial, sans-serif;
	}

	.card {
		background-color: #fff;
		border-radius: 8px;
		box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
		margin-bottom: 20px;
		padding: 20px;
		width: 100%;
		max-width: 600px;
	}

	h1,
	h2 {
		color: #333;
		margin-bottom: 20px;
		text-align: center;
	}

	.form-group {
		margin-bottom: 15px;
	}

	label {
		color: #555;
		display: block;
		font-weight: bold;
		margin-bottom: 5px;
	}

	input {
		border: 1px solid #ccc;
		border-radius: 4px;
		font-size: 16px;
		padding: 10px;
		width: 100%;
	}

	.submit-btn {
		background-color: #007bff;
		border: none;
		border-radius: 4px;
		color: white;
		cursor: pointer;
		font-size: 16px;
		padding: 10px;
		width: 100%;
	}

	.submit-btn:hover {
		background-color: #0056b3;
	}

	.result {
		background-color: #f9f9f9;
		border: 1px solid #ddd;
		border-radius: 4px;
		padding: 10px;
	}

	.preview-card {
		background-color: #f0f0f0;
		border: 1px solid #ddd;
		border-radius: 4px;
		padding: 10px;
	}

	.preview-box {
		background-color: #fff;
		border: 1px solid #ddd;
		border-radius: 4px;
		padding: 10px;
		max-height: 300px;
		overflow-y: auto;
	}
</style>
