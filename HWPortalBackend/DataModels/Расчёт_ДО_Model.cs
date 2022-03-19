namespace HWPortalBackend.DataModels
{
    public class Расчёт_ДО_Model : ModelBase
    {
        public Исходные_Данные Исходные_данные { get; set; }
        public Нагрузки Нагрузки { get; set; }
        public Варианты_Конструкций Варианты_конструкций { get; set; }

        public Расчёт_ДО_Model()
        {
            Тип_Модели = "Расчёт_ДО";
            Исходные_данные = new Исходные_Данные();
            Нагрузки = new Нагрузки();
            Варианты_конструкций = new Варианты_Конструкций();
        }
    }

}
