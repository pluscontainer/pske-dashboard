//
// SPDX-FileCopyrightText: 2024 SAP SE or an SAP affiliate company and Gardener contributors
//
// SPDX-License-Identifier: Apache-2.0
//

import {
  computed,
  isRef,
} from 'vue'

import { storeToRefs } from 'pinia'

import { useCredentialStore } from '@/store/credential'
import { useGardenerExtensionStore } from '@/store/gardenerExtension'
import { useCloudProfileStore } from '@/store/cloudProfile'

import {
  bindingProviderType,
  credentialProviderType,
} from './helper'

import filter from 'lodash/filter'
import get from 'lodash/get'

const CLOUD_PROFILE_LABEL = 'cloudprofile.garden.sapcloud.io/name'

export const useCloudProviderEntityList = (providerType, options = {}) => {
  if (!isRef(providerType)) {
    throw new TypeError('First argument `providerType` must be a ref object')
  }

  const {
    credentialStore = useCredentialStore(),
    gardenerExtensionStore = useGardenerExtensionStore(),
    cloudProfileStore = useCloudProfileStore(),
    cloudProfileName = null,
  } = options

  const { dnsProviderTypes } = storeToRefs(gardenerExtensionStore)
  const { sortedInfraProviderTypeList } = storeToRefs(cloudProfileStore)

  const cloudProfileNameValue = isRef(cloudProfileName) ? cloudProfileName : { value: cloudProfileName }

  return computed(() => {
    if (sortedInfraProviderTypeList.value.includes(providerType.value)) {
      return filter(credentialStore.infrastructureBindingList, binding => {
        if (bindingProviderType(binding) !== providerType.value) return false
        const label = get(binding, ['metadata', 'labels', CLOUD_PROFILE_LABEL])
        if (label && cloudProfileNameValue.value) return label === cloudProfileNameValue.value
        return true
      })
    }
    if (dnsProviderTypes.value.includes(providerType.value)) {
      return filter(credentialStore.dnsCredentialList, credential => {
        return credentialProviderType(credential) === providerType.value
      })
    }
    return []
  })
}
