package utils

import (
	"bufio"
	"crypto/sha256"
	"fmt"
	"math"
	"math/rand"
	"os"
	"time"
)

func OpenDbInitials(name string) (initials [4]string) {
	file, err := os.Open(name)
	checkDbInitialsError(err, &initials)
	initials = parseInitials(file)

	_ = file.Close()

	return initials
}

func parseInitials(file *os.File) (initials [4]string) {
	var reader = bufio.NewReader(file)
	for i := 0; i < 4; i++ {
		var text, _, err = reader.ReadLine()
		checkDbInitialsError(err, &initials)
		if err != nil {
			break
		}
		initials[i] = string(text)
	}
	return initials
}

func checkDbInitialsError(err error, initials *[4]string) {
	if err != nil {
		*initials = [...]string{"postgres", "secret", "localhost:5432", "db"}
	}
}

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
