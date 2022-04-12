namespace HWPortalBackend.DataModels.Расчёт_ДО
{
    public class Вариант_Конструкции_ДО
    {
        public List<Слой_ДО> Таблица_слоёв { get; set; }

        public Вариант_Конструкции_ДО()
        {
            Таблица_слоёв = new List<Слой_ДО> { new Слой_ДО() };
        }
    }

}
