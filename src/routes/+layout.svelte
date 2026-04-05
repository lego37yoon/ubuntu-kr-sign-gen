<script lang="ts">
    import "./layout.scss";
    import { onMount } from "svelte";

    type ThemePreference = "dark" | "light" | "system";

    const logo = "https://raw.githubusercontent.com/ubuntu-kr/ubuntu-kr.org/refs/heads/main/src/assets/UbuntuKrCircleWhite.svg"
    const themeStorageKey = "theme-preference";
    let themeToggle = $state<ThemePreference>("system");
    let menuToggle = $state<"has-menu-open"|"">("");
    let systemPrefersDark = $state(false);
    let pageTheme = $derived<"is-light" | "is-dark">(
        themeToggle === "dark" || (themeToggle === "system" && systemPrefersDark)
            ? "is-dark"
            : "is-light"
    );
    let { children } = $props();

    onMount(() => {
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)");
        const savedPreference = localStorage.getItem(themeStorageKey);
        if (
            savedPreference === "dark" ||
            savedPreference === "light" ||
            savedPreference === "system"
        ) {
            themeToggle = savedPreference;
        }

        systemPrefersDark = prefersDark.matches;
        const handleThemeChange = (event: MediaQueryListEvent) => {
            systemPrefersDark = event.matches;
        };

        prefersDark.addEventListener("change", handleThemeChange);

        return () => {
            prefersDark.removeEventListener("change", handleThemeChange);
        };
    });

    $effect(() => {
        if (typeof localStorage !== "undefined") {
            localStorage.setItem(themeStorageKey, themeToggle);
        }
    });
</script>

<div class={pageTheme}>
<header class={`p-navigation is-dark ${menuToggle}`}>
    <div class="p-navigation__row--25-75">
        <div class="p-navigation__banner">
            <div class="p-navigation__tagged-logo">
                <a class="p-navigation__link" href="/" target="_blank">
                    <div class="p-navigation__logo-tag">
                        <img 
                            class="p-navigation__logo-icon"
                            src={logo}
                            alt=""
                        />
                    </div>
                    <span class="p-navigation__logo-title">운영진 도구</span>
                </a>
            </div>
            <ul class="p-navigation__items">
                <li class="p-navigation__item">
                    <button class="p-navigation__link" type="button" onclick={() => 
                        menuToggle = (menuToggle === "" ? "has-menu-open" : "")
                    }>{menuToggle === "" ? "메뉴" : "메뉴 닫기"}</button>
                </li>
            </ul>
        </div>
        <nav class="p-navigation__nav" id="main-nav" aria-label="Main navigation">
            <ul class="p-navigation__items">
                <li class="p-navigation__item is-selected">
                    <a class="p-navigation__link" href="/">서명 생성기</a>
                </li>
                <li class="p-navigation__item">
                    <a class="p-navigation__link" href="https://www.ubuntu-kr.org/">홈</a>
                </li>
                <li class="p-navigation__item">
                    <a class="p-navigation__link" href="https://disclosures.ubuntu-kr.org/">공시</a>
                </li>
                <li class="p-navigation__item">
                    <a class="p-navigation__link" href="https://discourse.ubuntu-kr.org">포럼</a>
                </li>
                <li class="p-navigation__item">
                    <a class="p-navigation__link" href="https://ubuntu-kr.dooray.com">Dooray!</a>
                </li>             
            </ul>
            <ul class="p-navigation__items">
                <li class="p-navigation__item custom-theme-selector">
                    <label for="theme-select">
                        <i class="p-icon--highlight-off"></i>
                        <span>테마</span>
                    </label>
                    <select
                        id="theme-select"
                        bind:value={themeToggle}
                        aria-label="Color theme"
                    >
                        <option value="system">시스템 설정</option>
                        <option value="light">밝게</option>
                        <option value="dark">어둡게</option>
                    </select>
                </li>
            </ul>
        </nav>
    </div>
</header>

<main class="grid-row">
    {@render children()}
</main>
</div>

<style>
    @media (min-width: 1036px) {
        .p-navigation__row--25-75 .p-navigation__items:first-child {
            margin-left: 0rem;
        }
    }

    .custom-theme-selector {
        display: flex;
        align-items: center;
        justify-content: end;
    }

    .custom-theme-selector label {
        margin: 0.25rem;
    }

    .p-navigation__items .p-navigation__item select {
        margin: 0.25rem;
        width: min-content;
    }

    div.is-dark {
        background: #494949;
        color: #fff;
    }

    div.is-dark, div.is-light {
        min-height: 100vh;
        height: max-content;
    }
</style>
