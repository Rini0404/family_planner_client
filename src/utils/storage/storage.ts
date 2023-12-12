import AsyncStorage from '@react-native-async-storage/async-storage'

/**
 * Loads a string from storage.
 *
 * @param key The key to fetch.
 */
export const loadString = async (key: string): Promise<string | null> => {
    try {
        return await AsyncStorage.getItem(key)
    } catch {
        // not sure why this would fail... even reading the RN docs I'm unclear
        return null
    }
}

/**
 * Saves a string to storage.
 *
 * @param key The key to fetch.
 * @param value The value to store.
 */
export const saveStringToAsyncStorage = async (key: string, value: string): Promise<boolean> => {
    try {
        await AsyncStorage.setItem(key, value)
        console.log('saved key', key, 'with value', value)
        return true
    } catch {
        return false
    }
}

/**
 * Loads something from storage and runs it thru JSON.parse.
 *
 * @param key The key to fetch.
 */
export const load = async <T>(key: string): Promise<T | null> => {
    try {
        const almostThere = await AsyncStorage.getItem(key)
        return JSON.parse(almostThere ?? '')
    } catch {
        return null
    }
}

/**
 * Saves an object to storage.
 *
 * @param key The key to fetch.
 * @param value The value to store.
 */
export const save = async <T>(key: string, value: T): Promise<boolean> => {
    try {
        await AsyncStorage.setItem(key, JSON.stringify(value))
        return true
    } catch {
        return false
    }
}

/**
 * Removes something from storage.
 *
 * @param key The key to kill.
 */
export const remove = async (key: string): Promise<void> => {
    try {
        await AsyncStorage.removeItem(key)
    } catch {
        console.log('Failed to remove from storage')
    }
}

/**
 * Burn it all to the ground.
 */
export const clear = async (): Promise<void> => {
    try {
        await AsyncStorage.clear()
    } catch {
        console.log('Failed to clear storage')
    }
}
