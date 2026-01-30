# Timer Pomodoro 

Um cronômetro de produtividade moderno, elegante e personalizável baseado na técnica Pomodoro. Desenvolvido com **Vanilla JavaScript** orientado a objetos, focando em código limpo e arquitetura modular.

![Status do Projeto](https://img.shields.io/badge/status-concluído-brightgreen)


## Funcionalidades

* **Múltiplos Modos de Foco:** Alternância fácil entre *Foco* (Pomodoro), *Pausa Curta* e *Pausa Longa*.
* **Controles Completos:** Iniciar, Pausar e Reiniciar o ciclo a qualquer momento.
* **Personalização:** Defina seus próprios tempos para cada modo através do painel de configurações.
* **Feedback Visual e Sonoro:**
    * Barra de progresso dinâmica.
    * Favicon de relógio na aba do navegador.
    * Alertas sonoros suaves (Web Audio API) ao finalizar o tempo.
* **Notificações Desktop:** Alertas nativos do sistema para avisar quando o tempo acabar, mesmo se a aba estiver em segundo plano.
* **Estatísticas em Tempo Real:** Acompanhe o número de sessões completadas e o tempo total de foco.

## Estrutura do Projeto

O projeto segue o princípio de **Separação de Preocupações (SoC)**, dividindo estrutura, estilo e comportamento em arquivos distintos:

```text
pomodoro-timer/
│
├── index.html          # Estrutura semântica e markup
├── css/
│   └── style.css       # Estilos, tema visual e responsividade
└── js/
    └── script.js       # Lógica da aplicação (Classe PomodoroTimer)
```

## Como Executar

Este é um projeto estático (frontend puro), o que significa que não requer instalação de dependências complexas ou back-end.

1.  **Clone o repositório:**
    ```bash
    git clone [https://github.com/LarissaBSouza/pomodoro-timer](https://github.com/LarissaBSouza/pomodoro-timer)
    ```

2.  **Abra o projeto:**
    * Navegue até a pasta do projeto.
    * Abra o arquivo `index.html` em seu navegador preferido (Chrome, Firefox, Edge, Safari).

> **Dica Pro:** Para o funcionamento ideal das **Notificações** e do **Áudio**, alguns navegadores bloqueiam recursos executados diretamente do sistema de arquivos (`file://`). Recomenda-se usar uma extensão como o **Live Server** (VS Code) ou rodar um servidor local simples (`python -m http.server`).

## Tecnologias Utilizadas

* **HTML5:** Estrutura semântica, uso de SVG inline e inputs nativos.
* **CSS3:**
    * Layout com Flexbox.
    * Design responsivo (Mobile-first).
    * Transições suaves e variáveis de cores.
    * Família de fontes *Inter* (via Google Fonts).
* **JavaScript (ES6+):**
    * **Programação Orientada a Objetos (POO):** Lógica encapsulada na classe `PomodoroTimer`.
    * **Web Audio API:** Sintetizador de áudio nativo para gerar o som de alerta (sem arquivos `.mp3` externos).
    * **Notification API:** Integração com alertas do sistema operacional.
    * **DOM Manipulation:** Atualização reativa da interface.

## Configuração Padrão

O timer vem configurado com os tempos clássicos da técnica Pomodoro, mas é totalmente personalizável através da interface:

* **Foco:** 25 minutos
* **Pausa Curta:** 5 minutos
* **Pausa Longa:** 15 minutos

*Nota: As alterações nos inputs de tempo são aplicadas automaticamente para o próximo ciclo ou ao reiniciar o timer.*

## Contribuindo

Contribuições são muito bem-vindas! Se você quiser melhorar o código, corrigir bugs ou adicionar novas funcionalidades:

1.  Faça um **Fork** do projeto.
2.  Crie uma Branch para sua feature (`git checkout -b feature/MinhaNovaFeature`).
3.  Faça o **Commit** das suas alterações (`git commit -m 'feat: Adiciona nova funcionalidade X'`).
4.  Faça o **Push** para a branch (`git push origin feature/MinhaNovaFeature`).
5.  Abra um **Pull Request**.

---
Desenvolvido com muito café e foco.