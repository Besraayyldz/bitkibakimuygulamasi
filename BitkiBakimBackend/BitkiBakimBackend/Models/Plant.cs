namespace BitkiBakimBackend.Models
{
    public class Plant
    {
        public int Id { get; set; } // Birincil anahtar
        public string Name { get; set; } // Bitkinin adı
        public string? Description { get; set; } // Açıklama (isteğe bağlı)
        public string? ImageUrl { get; set; } // Görsel bağlantısı (isteğe bağlı)
        public int WateringIntervalDays { get; set; } // Kaç günde bir sulanmalı
    }
}
