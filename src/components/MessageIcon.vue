<script setup>


const {success, content} = defineProps(['content', 'success'])


</script>

<template>
    <div class="flex flex-row items-center justify-center text-[1vw] gap-x-4">
        <img v-if="success" src="data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAWCAYAAADTlvzyAAAACXBIWXMAABYlAAAWJQFJUiTwAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAEmSURBVHgBvdXLTcNAEAbgf4PgwGlFBS4BOkhq4IhAmwqgA5JKshLkSgu4A1KCSzAnJKJkMzOJojy8ju3Z5Jf81Hg/rbUeAxeOwZliJy7DNSbGoE+XRVhgXL54fxaQMXODbzrNdu+HJQZXSJwYJqHp9ZAwtRhnid9kr/QkRgnAQ5IZNsTG5ZOfqWfYAhvxuQpsi21B++ne6Ht55QdDQI45huXQF0iMCWin7p7Un4PaIvxjEEO7YhxeNK6iXgaUbpEQW4MBNvLcEarFOMZ+uL7pySCxyOuVYiUmY/DubupGVPxeh26OGRQYR3rp39csv33ktSOdvSp2s6mwLdgQVWN7YBe0LXYEtkG7YJVgE7QrFgXrUA3GOdm8ufXRj9NRpSXNl88+hyIrCDyfd+AcStEAAAAASUVORK5CYII=" alt="message icon" class="w-[1vw] h-[1vw]" />
        <img v-else src="data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAbCAYAAABiFp9rAAAACXBIWXMAABYlAAAWJQFJUiTwAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAANnSURBVHgBxZXLTxNRFMa/zjBo3LiUUtqBgn8BiQsXhkSiYsSAEV+48JGgW9cmiigimLAwRBMWPqLBZwwRozEuZOnChUsj8ohAHxToi9J2Whi/O7WEttMXLjzJSTo9557ffOfeewb4H6a3tGzTm5oq8I+md3dLrLPdPMhA0m4fSjgc/XpHh4wtmnjRhNPZzVqP9MbGHZlBKtHs9odxWdbjkrQWV9VbhFWiTBOQeF3dVU2WE6yjaw7H8AZMb27eqdls92MWix7jo/C4omir1dUD5SgzIPX1N2OEpOvECItbrY8NWLiqaojBaJSBDCcsWqIyAYnW1FyLVlbGsusIWMBqfYBPwAUv4F/lnznONkbs9oIwsfGR+vreVSoxqxEAwiPAaSN5FDjoAwIRBlayPCLaqKqDZjChJEIlEUJy1tFZMzwOdGQs+gicW6CyMBNyXChzOm9shhlKGhp6V9guszVLhFDASdM2vAaOsI2aSAxlO2HB1J7JQkmYpytMJSGTXA8hn4EzKGRjQDsT/UEuyHHCQqraG3I47gQVJWaW4yZE1EAp9gY4wQWBQGozM9wvlFVUJMxi7Eb4A9CJcowLWl1U5meB5RL8d2pP8irJeyF3A1NxYHIXcIDDbzsK2BoQ+Q5cbgVeYas2Ksvtc5IUW+Rbm7lHkrQRWW4rVkcqFNS7upR9dvueSotF0cWziUuSZDlUU7N3y1NfQJZqa6/7JCnJ+6UXdB4QH6f+BIdz2ZDF2to+LyHe1Gkq7oqS8Npsg19KVSYgPputx6MocU/q8mX4NBDkCfN7TWIeAStFmRgrXlUd4AYn3anLl+EzQGiYR5gTpPMnsGiW42YbF3ih88KEEkrvYWKS90ff7KLAL0LeA8fS+c+B/ZPAsjsr18jnhfY4HPdyYEKJz+nsd7FdLpOFbFfoCXA8++VeAmcFzGyNi8o8TuftDZihhKeLgeQ8H7N9gnvCVp3K1+5nvNDMiblM1howttE4INNWa59QkgcSYouOoohRWStbuzyfBzavqnelb17vgpZI5Czm+AlzrHTx0/iuGIgfnbGvwEV+uv3Zsej6ujY+Ozsnflueclrz7VfS8n+wXaUoyTZO/cOTf5WJWlPkvADOc4JYjATxg5P30gyFiCn8tsCeFLJuoIJtbBMwAWGdK2nIH7/krYiTIBSXAAAAAElFTkSuQmCC" alt="message icon" class="w-[1vw] h-[1vw]" />
        <div>
            {{ content }}

        </div>

    </div>
</template>