package utils

import (
	"crypto/sha256"
	"fmt"
	"math"
	"math/rand"
	"os"
	"regexp"
	"time"
)

func ReadFile(filename string) string {
	data, err := os.ReadFile(filename)

	if err != nil {
		panic(err)
	}
	return string(data)
}

func EncryptText(text string, salt string) []byte {
	var joinedText = salt + text
	var hash = sha256.New()
	hash.Write([]byte(joinedText))
	fmt.Println(joinedText)
	fmt.Println(string(hash.Sum(nil)))
	return hash.Sum(nil)

}

func RandomString(minimum int, maximum int) string {
	const letters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&"
	rand.New(rand.NewSource(time.Now().UnixNano()))
	var diff = int(math.Abs(float64(maximum - minimum)))
	var size = rand.Intn(diff) + minimum
	var b = make([]byte, size)

	for i := range b {
		b[i] = letters[rand.Intn(len(letters))]
	}

	return string(b)
}

func RegexCheck(regex string, text string) bool {
	var re = regexp.MustCompile(regex)

	return re.MatchString(text)
}
