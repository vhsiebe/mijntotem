<template>
    <div class="min-h-screen bg-background xl">
        <!-- Navigation -->
        <LayoutNavbar />

        <slot />
        <!-- Footer -->
        <LayoutFooter />
        
        <!-- Toast Notifications -->
        <LayoutToast />
    </div>
</template>