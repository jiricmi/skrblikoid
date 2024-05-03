package utils

import (
	"crypto/sha256"
	"fmt"
	"math"
	"math/rand"
	"os"
	"time"
)

func ReadFile(filename string) string {
	data, err := os.ReadFile(filename)

	if err != nil {
		panic(err)
	}
	return string(data)
}

func encryptText(text string, salt string) []byte {
	var joinedText = salt + text
	var hash = sha256.New()
	hash.Write([]byte(joinedText))
	fmt.Println(joinedText)
	fmt.Println(string(hash.Sum(nil)))
	return hash.Sum(nil)

}

func randomString(minimum int, maximum int) string {
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
