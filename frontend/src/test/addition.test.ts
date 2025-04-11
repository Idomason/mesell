import { addition, authenticate } from "./../Rough/Arithmetics";

describe("Arithmetic test suite", () => {
  it("returns addition 2 and 3", () => {
    const sut = addition;
    const real = sut(2, 3);
    expect(real).toBe(5);
    expect(real).toEqual(5);
    expect(real).toBeLessThan(10);
    expect(real).toBeGreaterThan(4);
  });

  describe.only("User Authentication", () => {
    test("for lowercase", () => {
      const sut = authenticate;
      const value = sut("admin@GMail.com", "ADmin");

      expect(value.emailToLowerCase).toBe("admin@gmail.com");
    });

    test("email characters", () => {
      const sut = authenticate;
      const value = sut("admin@GMail.com", "ADmin");

      expect(value.emailChar).toEqual(
        expect.arrayContaining([
          "n",
          "@",
          "G",
          "M",
          "a",
          "i",
          "l",
          ".",
          "c",
          "o",
          "m",
          "a",
          "d",
          "m",
          "i",
        ])
      );
    });

    test("email contains a character", () => {
      const sut = authenticate;
      const value = sut("admin@GMail.com", "ADmin");

      expect(value.emailChar).toContain("M");
    });

    test("user details", () => {
      const sut = authenticate;
      const value = sut("admin@GMail.com", "ADmin");

      expect(value.userDetails).toEqual({ age: 30, name: "ada" });
    });

    test("if user is valid", () => {
      const sut = authenticate;
      const value = sut("admin@GMail.com", "ADmin");

      expect(value.userDetails).toBeDefined();
      expect(value.userDetails).not.toBeUndefined();
      expect(value.userDetails).toBeTruthy();
      expect(value.userDetails).not.toBeFalsy();
    });

    test("if user is authenticated", () => {
      const sut = authenticate;
      const value = sut("admin@GMail.com", "ADmin");

      expect(value.isAuthenticated).toBeTruthy();
      expect(value.isAuthenticated).not.toBeFalsy();
    });
  });
});
