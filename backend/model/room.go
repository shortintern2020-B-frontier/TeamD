package model

type Room struct {
    ID int `db:"id" json:"room_id"`
    Title string `db:"title" json:"title"`
    Image_URL string `db:"image_url" json:"image_url"`
}
