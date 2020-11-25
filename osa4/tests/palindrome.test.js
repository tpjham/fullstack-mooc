const { TestScheduler } = require("jest")

const palindrome = require("../utils/for_testing").palindrome

test("Palindrome of a ", () => {
  const result = palindrome("a")

  expect(result).toBe("a")
})

test("Palindrome of react ", () => {
  const result = palindrome("react")

  expect(result).toBe("tcaer")
})

test("Palindrome of saippuakauppias", () => {
  const result = palindrome("saippuakauppias")

  expect(result).toBe("saippuakauppias")
})