import { useNav } from "./useNav";
import { useI18n } from "vue-i18n";
import { useRoute } from "vue-router";
import { watch, onBeforeMount } from "vue";
export function useTranslationLang(ref) {
    const { $storage, changeTitle, handleResize } = useNav();
    const { locale, t } = useI18n();
    const route = useRoute();
    function translationCh() {
        $storage.locale = { locale: "zh" };
        locale.value = "zh";
        ref && handleResize(ref.value);
    }
    function translationEn() {
        $storage.locale = { locale: "en" };
        locale.value = "en";
        ref && handleResize(ref.value);
    }
    watch(() => locale.value, () => {
        changeTitle(route.meta);
    });
    onBeforeMount(() => {
        locale.value = $storage.locale?.locale ?? "zh";
    });
    return {
        t,
        route,
        locale,
        translationCh,
        translationEn
    };
}
//# sourceMappingURL=useTranslationLang.js.map