namespace HWPortalBackend.DataModels
{
    public class Исходные_Данные
    {
        public string Район_проектирования { get; set; }
        public string Наименование_объекта { get; set; }
        public string Тип_местности_по_рельефу_view { get; set; }
        public int Тип_местности_по_рельефу { get; set; }
        public string Дорожно_климатическая_зона_view { get; set; }
        public int Дорожно_климатическая_зона { get; set; }
        public int Номер_района_по_количеству_расчётных_дней { get; set; }
        public int Схема_увлажнения_рабочего_слоя { get; set; }
        public string Категория_дороги_view { get; set; }
        public int Категория_дороги { get; set; }
        public float Поправка_на_влажность { get; set; }
        public string Тип_дорожной_одежды_view { get; set; }
        public int Тип_дорожной_одежды { get; set; }
        public int Количество_полос_движения { get; set; }
        public string Заданная_надёжность_view { get; set; }
        public int Заданная_надёжность { get; set; }
        public string Тип_земляного_полотна_view { get; set; }
        public int Тип_земляного_полотна { get; set; }
        public float Глубина_промерзания_грунта_от_поверхности_покрытия { get; set; }
        public float Расстояние_от_низа_дорожной_одежды_до_расчётного_УГВ { get; set; }
        public string Коэффициент_уплотнения_грунта_view { get; set; }
        public int Коэффициент_уплотнения_грунта { get; set; }
        public float Ширина_проезжей_части { get; set; }
    }

}
