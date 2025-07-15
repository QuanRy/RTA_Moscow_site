using FrequencyVisualization.Dal;
using FrequencyVisualization.ObjectModel;

namespace FrequencyVisualization.Services
{
    public class FactorService : IFactorService
    {
        readonly FactorRepository _repository;

        public FactorService(string connString)
        {
            _repository = new FactorRepository(connString);
        }

        public List<Factor> GetFactors()
        {

            Func<Factor, bool> expr = (Factor factor) => { return true; };

            return _repository.Get(expr);
        }

        public void InitFactors()
        {
            List<Factor> factors = new List<Factor>()
            {
                new Factor()
                {
                    Header = "Бренд",
                    MinDescription = "Известный бренд",
                    MaxDescription = "Новый бренд",
                },
                new Factor()
                {
                    Header = "Доля бренда на рынке",
                    MinDescription = "Высокая доля бренда на рынке",
                    MaxDescription = "Низкая доля бренда на рынке",
                },
                new Factor()
                {
                    Header = "Лояльность к бренду",
                    MinDescription = "Высокая лояльность к бренду",
                    MaxDescription = "Низкая лояльность к бренду",
                },
                new Factor()
                {
                    Header = "Цикл покупки",
                    MinDescription = "Длинный цикл покупки",
                    MaxDescription = "Короткий цикл покупки",
                },
                new Factor()
                {
                    Header = "Использование",
                    MinDescription = "Редкое использование",
                    MaxDescription = "Частое использование",
                },
                new Factor()
                {
                    Header = "Доля голоса",
                    MinDescription = "Высокая доля голоса",
                    MaxDescription = "Низкая доля голоса",
                },
                new Factor()
                {
                    Header = "Аудитория",
                    MinDescription = "Простая аудитория",
                    MaxDescription = "Сложная аудитория",
                },
                new Factor()
                {
                    Header = "Сложность сообщения",
                    MinDescription = "Простое сообщение",
                    MaxDescription = "Сложное сообщение",
                },
                new Factor()
                {
                    Header = "Уникальность сообщения",
                    MinDescription = "Уникальное сообщение (только у нас)",
                    MaxDescription = "Неуникальное сообщение (как у конкурентов)",
                },
                new Factor()
                {
                    Header = "Сообщение в эфире",
                    MinDescription = "Сообщение уже было в эфире",
                    MaxDescription = "Сообщение впервые в эфире",
                },
                                new Factor()
                {
                    Header = "Коммуникация",
                    MinDescription = "Продуктовая коммуникация",
                    MaxDescription = "Имиджевая коммуникация",
                },
                new Factor()
                {
                    Header = "Вариация сообщения",
                    MinDescription = "Одна вариация сообщения",
                    MaxDescription = "Много вариаций",
                },
                new Factor()
                {
                    Header = "Износ сообщения",
                    MinDescription = "Высокий износ сообщения",
                    MaxDescription = "Низкий износ сообщения",
                },
                new Factor()
                {
                    Header = "Реклама",
                    MinDescription = "Длинная реклама",
                    MaxDescription = "Короткая реклама",
                },
                new Factor()
                {
                    Header = "Рекламы в медиа",
                    MinDescription = "Немного рекламы в медиа",
                    MaxDescription = "Много рекламы в медиа",
                },
                new Factor()
                {
                    Header = "Контент",
                    MinDescription = "Подходящий контент",
                    MaxDescription = "Нейтральный контент",
                },
                new Factor()
                {
                    Header = "Аудитория",
                    MinDescription = "Аудитория внимательна",
                    MaxDescription = "Аудитория невнимательна",
                },
                new Factor()
                {
                    Header = "Размещение",
                    MinDescription = "Непрерывное размещение",
                    MaxDescription = "Размещение с перерывами",
                },
                new Factor()
                {
                    Header = "Используется медиа-канал",
                    MinDescription = "Используется один медиа-канал",
                    MaxDescription = "Используется несколько каналов",
                },
                new Factor()
                {
                    Header = "Медиа",
                    MinDescription = "Высокочастотное медиа",
                    MaxDescription = "Низкочастотное медиа",
                }
            };
            _repository.Create(factors);
        }
    }
}
