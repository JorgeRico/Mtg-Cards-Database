<template>
    <v-row class="revert-flex">
        <v-dialog
        v-model="dialog"
        persistent
        width="auto"
        >
        <template v-slot:activator="{ props }">
            <button v-bind="props">
                <VLabel
                    for="privacy-policy"
                    style="opacity: 1;"
                    >
                    <span class="me-1">I agree to</span>
                    <a
                        href="javascript:void(0)"
                        data-toggle="modal" data-target="#exampleModal"
                        class="text-primary"
                    >privacy policy & terms</a>
                </VLabel>
            </button>
        </template>
        <v-card>
            <v-card-title class="text-h5">
            Terms and Conditions
            </v-card-title>
            <v-card-text>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus porta luctus consectetur. Fusce varius fermentum mollis. Sed at quam molestie, imperdiet orci eget, accumsan erat. Morbi auctor et augue euismod sollicitudin. Phasellus malesuada eleifend dapibus. Praesent et placerat libero. Phasellus augue est, luctus eget scelerisque in, commodo nec est. In nisi quam, luctus ut nibh molestie, feugiat venenatis libero. Duis nec orci eu metus luctus mollis. Fusce lacus dolor, convallis sed quam id, blandit hendrerit lectus. Maecenas quis ultrices purus, vel rutrum neque. Curabitur interdum, massa quis congue lacinia, nulla diam accumsan justo, non finibus orci urna ut nisl. Cras blandit, felis sit amet commodo elementum, erat libero ullamcorper eros, et pulvinar erat quam quis mauris. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Suspendisse ante mauris, tincidunt vel pharetra sit amet, semper sit amet elit.
                <br><br>
                Praesent ac auctor ipsum, non viverra leo. Nulla euismod justo a augue commodo rhoncus. Vivamus sem diam, viverra a orci vel, aliquet semper justo. Nullam a mauris eu dui maximus suscipit. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nunc in urna sit amet neque faucibus aliquet. Mauris ex felis, dictum a nibh quis, ornare dignissim felis. Nam tempus pellentesque erat. Vivamus odio mi, feugiat non viverra in, tincidunt eu velit. Ut scelerisque suscipit neque, bibendum ornare tellus mollis non. Maecenas urna lorem, eleifend vitae sodales at, dignissim placerat urna.
                <br><br>
                Etiam blandit arcu odio, nec ullamcorper justo efficitur vitae. Etiam posuere libero auctor purus sollicitudin, at tempus risus maximus. Suspendisse luctus pulvinar placerat. Quisque sed dapibus mi. Quisque placerat maximus quam, ac placerat est accumsan nec. Mauris pulvinar lobortis turpis. Nulla facilisi. Donec dapibus non leo quis feugiat. Ut convallis ac magna ac finibus.</v-card-text>
            <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
                color="green-darken-1"
                variant="text"
                @click="closeModal"
            >
                Disagree
            </v-btn>
            <v-btn
                color="green-darken-1"
                variant="text"
                @click="closeModal"
            >
                Agree
            </v-btn>
            </v-card-actions>
        </v-card>
        </v-dialog>
    </v-row>
</template>

<script>

export default {
    data () {
        return {
            dialog: false,
        }
    },
    methods: {
        
    }
}
</script>