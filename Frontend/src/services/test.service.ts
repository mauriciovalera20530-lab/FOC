import { httpGet, type ApiListResponse } from './http.service'

type ApiTest = {
  id: number
  name: string
  status?: boolean | null
}

export type TestRow = {
  id: number
  name: string
  status: string
}

type TestResponse = ApiListResponse<{
  tests?: ApiTest[]
}>

const FALLBACK_TESTS: TestRow[] = [
  { id: 1, name: 'Test 1', status: 'Activo' },
  { id: 2, name: 'Test 2', status: 'Activo' },
]

const normalizeTests = (tests: ApiTest[] = []): TestRow[] =>
  tests.map((test) => ({
    id: test.id,
    name: test.name,
    status: test.status === false ? 'Inactivo' : 'Activo',
  }))

export const listTests = async (): Promise<TestRow[]> => {
  try {
    const response = await httpGet<TestResponse>('/test')
    const tests = response.data?.tests
    if (!tests || tests.length === 0) {
      return FALLBACK_TESTS
    }
    return normalizeTests(tests)
  } catch (error) {
    console.warn('listTests fallback:', error)
    return FALLBACK_TESTS
  }
}

