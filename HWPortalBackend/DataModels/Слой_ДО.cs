namespace HWPortalBackend.DataModels
{
    public class Слой_ДО
    {
        public int id { get; set; }
        public string Наименование { get; set; }
        public float Толщина { get; set; }
        public float МинТолщина { get; set; }
        public float МаксТолщина { get; set; }
        public float ШагТолщины { get; set; }
    }

}
