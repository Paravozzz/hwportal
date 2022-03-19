namespace HWPortalBackend.DataModels
{
    public class Нагрузки
    {
        public string Группа_расчётной_нагрузки_view { get; set; }
        public int Группа_расчётной_нагрузки { get; set; }
        public bool Однобалонное_колесо { get; set; }
        public float Статическая_нагрузка_на_колесо { get; set; }
        public float Давление_в_шине { get; set; }
        public float Показатель_изменения_интенсивности { get; set; }
        public int Год_на_который_задана_интенсивность { get; set; }
        public int Срок_работ_по_капитальному_ремонту { get; set; }
        public int Срок_работ_по_ремонту { get; set; }
        public bool Суммарное_число_приложений_расчётной_нагрузки_flag { get; set; }
        public int Cуммарное_число_приложений_расчётной_нагрузки { get; set; }
        public bool Приведённая_интенсивность_на_одну_полосу_flag { get; set; }
        public int Приведённая_интенсивность_на_одну_полосу { get; set; }
        public string Коэффициенты_приведения_к_нагрузке_view { get; set; }
        public int Коэффициенты_приведения_к_нагрузке { get; set; }
        public List<Нагрузка_ТС> Таблица_нагрузок { get; set; }

        public Нагрузки()
        {
            Таблица_нагрузок = new List<Нагрузка_ТС> { new Нагрузка_ТС() };
        }
    }

}
