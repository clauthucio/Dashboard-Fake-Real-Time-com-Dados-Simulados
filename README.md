**BRIEFING \- Dashboard “Fake Real-Time” com Dados Simulados (MVP)** 

**Visão Geral** 

A empresa fictícia **Notry Analytics** está iniciando a implantação de um sistema interno de monitoramento de indicadores operacionais. Porém, como o setor de TI ainda não possui integrações com máquinas ou servidores industriais, o primeiro passo será criar um **Dashboard em “Fake Real-Time”**, onde os dados **não vêm da fábrica**, mas sim de uma **API simulada**. 

O objetivo deste MVP é demonstrar como um painel de monitoramento funcionaria no mundo real, utilizando: 

● Atualização automática de KPIs 

● Gráficos que reagirem a novos dados 

● Histórico acumulado ao longo do dia 

● Simulação de consumo, produção, falhas, temperatura etc. 

Embora os dados sejam falsos, **a lógica, a estrutura, o design e os fluxos são reais**, igual ao que um sistema industrial moderno usa para monitoramento contínuo. 

**Contexto Industrial** 

Indústrias modernas dependem de dashboards em tempo real para monitorar: 

● Produção contínua 

● Consumo de energia 

● Falhas de máquinas 

● Taxa de retrabalho 

● Velocidade de linhas 

● Ocupação de setores 

● Status de equipamentos 

Sem painéis atualizados automaticamente, problemas podem passar despercebidos, como: 

● quedas súbitas de produção, 

● aumento anormal do consumo de energia, 

● instabilidade em máquinas, 

● atrasos em linhas,  
● excedente de temperatura. 

Para treinar a equipe de desenvolvimento, a **Notry** criou este projeto educacional: **um dashboard real, com gráficos reais, mas com dados simulados.** 

**Perfis de Usuários (Papéis no sistema)** 

Mesmo sendo um sistema simples, trabalharemos com três papéis para treinar permissões e lógica condicional. 

Operador 

● Apenas visualiza os KPIs. 

● Acessa gráficos e histórico. 

● Não altera parâmetros. 

● Não configura simulação. 

Supervisor 

● Visualiza tudo que o operador vê. 

● Pode filtrar dashboards por setores. 

● Pode ajustar metas diárias. 

● Pode exportar dados do histórico. 

Administrador 

● CRUD de usuários. 

● CRUD de setores. 

● Configura parâmetros da simulação: 

○ intervalos, 

○ limites de KPI, 

○ tamanho da janela de histórico. 

● Acessa todas as telas. 

✔ **Funcionalidades Essenciais do MVP** 

✔ **1\. Autenticação** 

● Login 

● Logout 

● Guard de rotas 

● Permissões por papel  
✔ **2\. Dashboard em Fake Real-Time** 

Atualização automática a cada 5 segundos (ou configurável). KPIs mínimos: 

● Produção simulada (unidades/h) 

● Consumo energético simulado 

● Temperatura simulada 

● Status “Verde / Amarelo / Vermelho” baseado em limites 

Cada atualização deve: 

● substituir o valor anterior, 

● alimentar os gráficos, 

● registrar no histórico diário. 

✔ **3\. Gráficos** 

Mínimo de 3 gráficos: 

● **Linha (Line Chart)**: histórico de temperatura 

**Barra (Bar Chart)**: comparação de produção por setor 

● **Gauge ou KPI Card**: nível atual de consumo 

Os gráficos devem ser atualizados automaticamente. 

✔ **4\. Histórico Diário** 

Cada atualização gerada pelo “fake backend” deve ser armazenada localmente (localStorage ou service interno). 

Histórico deve mostrar: 

● hora 

● valores gerados 

● setor selecionado (se aplicável) 

● alertas gerados 

✔ **5\. Configurações da Simulação (somente admin)** 

Admin pode ajustar: 

● intervalo de atualização (ex.: 3s, 5s, 10s) 

● limites de alerta (por KPI) 

● tipo de gráfico 

● ativar/desativar setores

**Cenário Industrial que o Projeto Simula** 

Imagine que a fábrica está em fase de integração digital. As máquinas **ainda não enviam dados reais**, mas a empresa quer treinar o time para: 

● interpretar painéis; 

● tomar decisões baseadas em dados; 

● visualizar comportamento de KPIs ao longo do turno; 

● construir interfaces de monitoramento real-time. 

O MVP simula exatamente o comportamento de um dashboard industrial: 

● dados oscilam de forma natural, 

● valores podem subir, cair ou gerar alerta, 

● gráficos mostram tendência, 

● histórico permite análise rápida, 

● supervisores acompanham metas. 

Este tipo de dashboard é extremamente comum em: 

● centros de controle, 

● salas de monitoramento, 

● chão de fábrica, 

● painéis de energia, 

● núcleos de qualidade, 

● setores de manutenção. 

Mesmo sendo “fake real-time”, o funcionamento é idêntico ao real, apenas sem sensores e sem máquinas conectadas. 

**Visão do Sistema** 

O sistema deve permitir aos usuários acompanhar indicadores de forma clara, rápida e visual. 

O dashboard mostra: 

● KPIs principais atualizados automaticamente 

● Tendências (aumentando / caindo) 

● Cores de alerta (verde / amarelo / vermelho) 

● Gráficos dinâmicos 

● Histórico diário 

A experiência deve ser fluida, com gráficos animados e layout limpo. 

**Como Funciona na Fábrica**  
No mundo real, sensores enviam dados continuamente para APIs industriais. Aqui, substituímos sensores por geradores de dados que emitem valores aleatórios dentro de intervalos definidos. 

| KPI  | Intervalo Padrão  | Comportamento |
| :---- | :---- | :---- |
| Produção  | 100 \- 300  | varia lentamente |
| Temperatura  | 20 \- 60c |  |
| Consumo  | 20 \- 200kWh  | oscila conforme carga |

A cada 5 segundos: 

1\. O serviço gera novos valores. 

2\. O dashboard recebe via observable. 

3\. Os KPIs são atualizados. 

4\. O histórico ganha uma nova linha. 

5\. Gráficos são pré-renderizados. 

**Fluxo Geral da Aplicação (Simplificado)** 

● O **operador** acessa o dashboard e acompanha em tempo real os KPIs que são atualizados automaticamente pelo sistema. 

● O **supervisor** analisa os gráficos, verifica tendências e compara os valores com as metas configuradas para o dia. 

● O **administrador** gerencia usuários, configura os parâmetros da simulação e ajusta os limites de alerta dos indicadores.
