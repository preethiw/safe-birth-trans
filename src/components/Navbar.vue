<template>
    <nav class="navbar navbar-expand-md navbar-dark fixed-top">
        <div class="collapse navbar-collapse" id="navbarCollapse">
            <ul class="navbar-nav ml-auto">
                <locale-switcher />
            </ul>
        </div>
    </nav>
</template>

<script>
import LocalizedLink from './LocalizedLink'
import LocaleSwitcher from './LocaleSwitcher'

export default {
    components: {
        LocalizedLink,
        LocaleSwitcher,
    },
}
</script>


<style scoped>
    .navbar {
        background-color: #181D26;
    }
</style>
