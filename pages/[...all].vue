<script setup lang="ts">
const { t } = useI18n()

throw createError({ statusCode: 404, statusMessage: t('error.title'), fatal: true })
</script>
