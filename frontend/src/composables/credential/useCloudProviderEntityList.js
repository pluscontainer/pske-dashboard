//
// SPDX-FileCopyrightText: 2024 SAP SE or an SAP affiliate company and Gardener contributors
//
// SPDX-License-Identifier: Apache-2.0
//

import {
  computed,
  isRef,
  unref,
} from 'vue'

import { useCredentialStore } from '@/store/credential'

import { getCloudProviderEntityList } from './helper'

import filter from 'lodash/filter'
import get from 'lodash/get'

const CLOUD_PROFILE_LABEL = 'cloudprofile.garden.sapcloud.io/name'

export const useCloudProviderEntityList = (providerType, options = {}) => {
  if (!isRef(providerType)) {
    throw new TypeError('First argument `providerType` must be a ref object')
  }

  const {
    credentialStore = useCredentialStore(),
    vendorType,
    cloudProfileName,
  } = options

  return computed(() => {
    const entityList = getCloudProviderEntityList(providerType.value, {
      credentialStore,
      vendorType: unref(vendorType),
    })
    const cloudProfileNameValue = unref(cloudProfileName)
    if (unref(vendorType) !== 'infra' || !cloudProfileNameValue) {
      return entityList
    }
    return filter(entityList, binding => {
      const label = get(binding, ['metadata', 'labels', CLOUD_PROFILE_LABEL])
      return !label || label === cloudProfileNameValue
    })
  })
}
