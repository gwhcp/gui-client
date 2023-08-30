<script lang="ts"
        setup>
import { useField } from "vee-validate";

const props = defineProps({
    checked: {
        type: Boolean,
        default: false
    },
    className: {
        type: String,
        required: false
    },
    disabled: {
        type: Boolean,
        default: false
    },
    forName: {
        type: String,
        required: true
    },
    helpText: {
        type: String,
        required: false
    },
    label: {
        type: String,
        required: true
    },
    label2: {
        type: String,
        required: false
    },
    name: {
        type: String,
        required: true
    },
    value: {
        type: String,
        required: false
    }
});

// use `toRef` to create reactive references to `name` prop which is passed to `useField`
// this is important because vee-validte needs to know if the field name changes
// https://vee-validate.logaretm.com/v4/guide/composition-api/caveats
const name = toRef(props, 'name');

// we don't provide any rules here because we are using form-level validation
// https://vee-validate.logaretm.com/v4/guide/validation#form-level-validation
const { meta } = useField(name, undefined, {
    initialValue: props.value
});
</script>

<template>
    <Field v-slot="{ field, meta, errorMessage, handleChange, handleBlur }"
           :name="<string>name">
        <div :class="{ 'has-error': !!errorMessage, success: meta.valid, 'required': false }">
            <div :class="className">
                <input :id="forName"
                       v-model="field.value"
                       :checked="checked"
                       :disabled="disabled"
                       :value="field.value = value"
                       class="list-group-item-check"
                       type="radio"
                       v-bind="field"
                       @blur="handleBlur"
                       @input="handleChange">

                <label :for="forName"
                       class="list-group-item py-3"> {{ label }}

                    <span v-if="label2"
                          class="d-block small">{{ label2 }}</span> </label>
            </div>

            <div v-if="helpText"
                 class="form-text">{{ helpText }}
            </div>

            <div v-if="errorMessage"
                 v-show="errorMessage || !meta.valid"
                 class="help-message text-danger">
                Must choose one option
            </div>
        </div>
    </Field>
</template>

<style lang="css">
.list-group {
    width: auto;
    max-width: 460px;
}

[contenteditable]:focus {
    outline: 0;
}

.list-group-checkable {
    display: grid;
    gap: .5rem;
    border: 0;
}

.list-group-checkable .list-group-item {
    cursor: pointer;
    border-radius: .5rem;
}

.list-group-item-check {
    position: absolute;
    clip: rect(0, 0, 0, 0);
    pointer-events: none;
}

.list-group-item-check:hover + .list-group-item {
    background-color: var(--bs-light);
}

.list-group-item-check:checked + .list-group-item {
    color: #fff;
    background-color: var(--bs-blue);
}

.list-group-item-check[disabled] + .list-group-item,
.list-group-item-check:disabled + .list-group-item {
    pointer-events: none;
    filter: none;
    opacity: .5;
}
</style>