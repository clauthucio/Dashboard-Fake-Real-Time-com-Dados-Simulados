import { CommonModule, DatePipe } from '@angular/common';
import { Component, inject, OnInit, signal, computed, OnDestroy } from '@angular/core';
import { ButtonLogout } from "@core/components/button-logout/button-logout";
import { AuthService } from '@core/services/auth.service';
import { FormsModule } from '@angular/forms';

// Interfaces
interface Machine {
  id: number;
  name: string;
  status: 'running' | 'stopped' | 'warning' | 'maintenance';
  efficiency: number;
  lastUpdate: Date;
}

interface Metric {
  id: number;
  title: string;
  value: string;
  label: string;
  icon: string;
  trend: 'up' | 'down' | 'stable';
  progress?: number;
}

interface User {
  name: string;
  shift: string;
  department?: string;
}

@Component({
  selector: 'app-operador',
  imports: [ButtonLogout, CommonModule, FormsModule, DatePipe],
  templateUrl: './operador.html',
  styleUrl: './operador.css',
})
export class Operador implements OnInit, OnDestroy {
  private authService = inject(AuthService);
  
  // Signals principais
  currentTime = signal<string>('');
  isLoading = signal<boolean>(false);
  isLinePaused = signal<boolean>(false);
  
  // Dados do usuário (pode vir do AuthService)
  user: User = {
    name: 'Carlos Silva',
    shift: 'T1 (06:00 - 14:00)',
    department: 'Produção'
  };
  
  userName = this.user.name;
  
  // Metrics com signals
  metrics = signal<Metric[]>([
    { 
      id: 1, 
      title: 'Produção', 
      value: '0', 
      label: 'Unidades/hora', 
      icon: 'fa-boxes', 
      trend: 'stable' 
    },
    { 
      id: 2, 
      title: 'Eficiência', 
      value: '0%', 
      label: 'OEE', 
      icon: 'fa-chart-line', 
      trend: 'stable',
      progress: 0
    },
    { 
      id: 3, 
      title: 'Qualidade', 
      value: '0%', 
      label: 'Taxa de Aceitação', 
      icon: 'fa-award', 
      trend: 'stable' 
    },
    { 
      id: 4, 
      title: 'Intervalos', 
      value: '0 min', 
      label: 'Tempo Parado', 
      icon: 'fa-exclamation-triangle', 
      trend: 'stable' 
    }
  ]);
  
  // Máquinas com signal
  machines = signal<Machine[]>([
    { id: 1, name: 'Corte CNC', status: 'running', efficiency: 92, lastUpdate: new Date() },
    { id: 2, name: 'Prensa Hidráulica', status: 'running', efficiency: 88, lastUpdate: new Date() },
    { id: 3, name: 'Furadeira Auto.', status: 'warning', efficiency: 75, lastUpdate: new Date() },
    { id: 4, name: 'Solda Robótica', status: 'maintenance', efficiency: 0, lastUpdate: new Date() },
    { id: 5, name: 'Esteira Principal', status: 'running', efficiency: 95, lastUpdate: new Date() },
    { id: 6, name: 'Robô Montagem', status: 'stopped', efficiency: 0, lastUpdate: new Date() }
  ]);
  
  // Computed values
  lineStatus = computed(() => {
    if (this.isLinePaused()) return 'pausado';
    
    const machines = this.machines();
    const running = machines.filter(m => m.status === 'running').length;
    const total = machines.length;
    
    if (running === total) return 'operando_normalmente';
    if (running === 0) return 'totalmente_parado';
    if (running / total < 0.5) return 'operacao_critica';
    return 'operacao_parcial';
  });
  
  lineEfficiency = computed(() => {
    const machines = this.machines();
    const runningMachines = machines.filter(m => m.status === 'running');
    
    if (runningMachines.length === 0) return 0;
    
    const totalEfficiency = runningMachines.reduce((sum, machine) => sum + machine.efficiency, 0);
    return Math.round(totalEfficiency / runningMachines.length);
  });
  
  // Timer para atualizações
  private timeInterval: any;
  private updateInterval: any;
  
  ngOnInit(): void {
    this.startClock();
    this.startAutoUpdate();
    this.loadInitialData();
  }
  
  ngOnDestroy(): void {
    this.stopTimers();
  }
  
  // ========== MÉTODOS DO RELÓGIO ==========
  startClock(): void {
    this.updateTime();
    this.timeInterval = setInterval(() => this.updateTime(), 1000);
  }
  
  updateTime(): void {
    const now = new Date();
    this.currentTime.set(now.toLocaleTimeString('pt-BR'));
  }
  
  // ========== ATUALIZAÇÃO AUTOMÁTICA ==========
  startAutoUpdate(): void {
    // Atualiza dados a cada 30 segundos
    this.updateInterval = setInterval(() => {
      if (!this.isLinePaused()) {
        this.simulateProduction();
      }
    }, 30000);
  }
  
  stopTimers(): void {
    if (this.timeInterval) clearInterval(this.timeInterval);
    if (this.updateInterval) clearInterval(this.updateInterval);
  }
  
  // ========== CARREGAMENTO INICIAL ==========
  loadInitialData(): void {
    this.isLoading.set(true);
    
    setTimeout(() => {
      this.metrics.set([
        { id: 1, title: 'Produção', value: '152', label: 'Unidades/hora', icon: 'fa-boxes', trend: 'up' },
        { id: 2, title: 'Eficiência', value: '87%', label: 'OEE', icon: 'fa-chart-line', trend: 'up', progress: 87 },
        { id: 3, title: 'Qualidade', value: '98.5%', label: 'Taxa de Aceitação', icon: 'fa-award', trend: 'stable' },
        { id: 4, title: 'Intervalos', value: '12 min', label: 'Tempo Parado', icon: 'fa-exclamation-triangle', trend: 'down' }
      ]);
      
      this.isLoading.set(false);
    }, 1500);
  }
  
  // ========== ATUALIZAÇÃO MANUAL ==========
  refreshData(): void {
    if (this.isLoading()) return;
    
    this.isLoading.set(true);
    
    setTimeout(() => {
      this.updateProductionMetrics();
      this.updateMachineStatus();
      this.isLoading.set(false);
      
      console.log('✅ Dados atualizados em', new Date().toLocaleTimeString());
    }, 2000);
  }
  
  // ========== SIMULAÇÃO DE PRODUÇÃO ==========
  simulateProduction(): void {
    if (Math.random() > 0.3) return; // 70% chance de atualizar
    
    this.updateProductionMetrics();
    this.updateMachineStatus();
  }
  
  updateProductionMetrics(): void {
    this.metrics.update(metrics => 
      metrics.map(metric => {
        const newMetric = { ...metric };
        
        switch(metric.id) {
          case 1: // Produção
            const currentProd = parseInt(metric.value) || 0;
            const variation = Math.floor(Math.random() * 10) - 3;
            newMetric.value = Math.max(100, currentProd + variation).toString();
            newMetric.trend = variation > 0 ? 'up' : variation < 0 ? 'down' : 'stable';
            break;
            
          case 2: // Eficiência
            const currentEff = parseInt(metric.value) || 0;
            const effChange = (Math.random() * 3) - 1.5;
            const newEff = Math.max(70, Math.min(100, currentEff + effChange));
            newMetric.value = `${newEff.toFixed(1)}%`;
            newMetric.progress = Math.round(newEff);
            newMetric.trend = effChange > 0 ? 'up' : effChange < 0 ? 'down' : 'stable';
            break;
            
          case 3: // Qualidade
            const currentQual = parseFloat(metric.value) || 98.5;
            const qualChange = (Math.random() * 0.6) - 0.3;
            const newQual = Math.max(96, Math.min(100, currentQual + qualChange));
            newMetric.value = `${newQual.toFixed(1)}%`;
            newMetric.trend = qualChange > 0 ? 'up' : qualChange < 0 ? 'down' : 'stable';
            break;
            
          case 4: // Intervalos
            const currentStop = parseInt(metric.value) || 12;
            const stopChange = Math.floor(Math.random() * 3);
            newMetric.value = `${Math.max(0, currentStop + stopChange)} min`;
            newMetric.trend = stopChange > 0 ? 'up' : 'down';
            break;
        }
        
        return newMetric;
      })
    );
  }
  
  updateMachineStatus(): void {
    this.machines.update(machines =>
      machines.map(machine => {
        // 15% de chance de mudar status
        if (Math.random() < 0.15) {
          const statuses: Machine['status'][] = ['running', 'stopped', 'warning', 'maintenance'];
          const weights = [0.6, 0.1, 0.2, 0.1]; // Probabilidades
          const rand = Math.random();
          
          let newStatus: Machine['status'] = 'running';
          let cumulativeWeight = 0;
          
          for (let i = 0; i < statuses.length; i++) {
            cumulativeWeight += weights[i];
            if (rand < cumulativeWeight) {
              newStatus = statuses[i];
              break;
            }
          }
          
          return {
            ...machine,
            status: newStatus,
            efficiency: this.calculateNewEfficiency(machine.efficiency, newStatus),
            lastUpdate: new Date()
          };
        }
        
        // Pequena variação na eficiência
        return {
          ...machine,
          efficiency: this.calculateNewEfficiency(machine.efficiency, machine.status),
          lastUpdate: new Date()
        };
      })
    );
  }
  
  private calculateNewEfficiency(current: number, status: Machine['status']): number {
    if (status === 'maintenance' || status === 'stopped') return 0;
    
    const variation = (Math.random() * 4) - 2; // -2% a +2%
    let newEff = current + variation;
    
    if (status === 'running') {
      newEff = Math.max(70, Math.min(100, newEff));
    } else if (status === 'warning') {
      newEff = Math.max(50, Math.min(80, newEff));
    }
    
    return Math.round(newEff * 10) / 10; // Uma casa decimal
  }
  
  // ========== MÉTODOS DE CONTROLE ==========
  reportIssue(): void {
    const issueType = prompt('Tipo de problema:\n1. Máquina\n2. Qualidade\n3. Segurança\n4. Outro');
    const description = prompt('Descrição do problema:');
    
    if (description) {
      alert('✅ Problema reportado! A equipe de manutenção foi notificada.');
      console.log('Problema reportado:', { type: issueType, description });
      
      // Aqui você enviaria para um serviço
      // this.issueService.report({ type: issueType, description }).subscribe(...)
    }
  }
  
  toggleLine(): void {
    const newState = !this.isLinePaused();
    this.isLinePaused.set(newState);
    
    if (newState) {
      // Pausa todas as máquinas
      this.machines.update(machines =>
        machines.map(m => ({
          ...m,
          status: 'stopped',
          lastUpdate: new Date()
        }))
      );
      alert('⏸️ Linha de produção PAUSADA');
    } else {
      // Retoma algumas máquinas
      this.updateMachineStatus();
      alert('▶️ Linha de produção RETOMADA');
    }
  }
  
  emergencyStop(): void {
    if (confirm('⚠️ ATENÇÃO: Parada de emergência irá parar TODAS as máquinas!\nDeseja continuar?')) {
      this.isLinePaused.set(true);
      this.machines.update(machines =>
        machines.map(m => ({
          ...m,
          status: 'stopped',
          efficiency: 0,
          lastUpdate: new Date()
        }))
      );
      
      alert('🛑 PARADA DE EMERGÊNCIA ATIVADA!');
      console.error('PARADA DE EMERGÊNCIA ATIVADA');
    }
  }
  
  // ========== MÉTODOS AUXILIARES ==========
  getMachinesByStatus(status: Machine['status']) {
    return this.machines().filter(m => m.status === status);
  }
  
  getMachineStatusClass(status: Machine['status']): string {
    return `status-${status}`;
  }
  
  getMachineStatusIcon(status: Machine['status']): string {
    const icons = {
      running: 'fa-play-circle',
      stopped: 'fa-stop-circle',
      warning: 'fa-exclamation-circle',
      maintenance: 'fa-wrench'
    };
    return icons[status];
  }
  
  getMachineStatusText(status: Machine['status']): string {
    const texts = {
      running: 'Em Operação',
      stopped: 'Parada',
      warning: 'Atenção',
      maintenance: 'Manutenção'
    };
    return texts[status];
  }
  
  getMetricCardClass(trend: 'up' | 'down' | 'stable'): string {
    return `trend-${trend}`;
  }
  
  getLineAlertClass(): string {
    const status = this.lineStatus();
    return `alert-${status.replace('_', '-')}`;
  }
  
  getLineAlertIcon(): string {
    const status = this.lineStatus();
    const icons: Record<string, string> = {
      'operando_normalmente': 'fa-check-circle',
      'operacao_parcial': 'fa-info-circle',
      'operacao_critica': 'fa-exclamation-triangle',
      'totalmente_parado': 'fa-times-circle',
      'pausado': 'fa-pause-circle'
    };
    return icons[status] || 'fa-question-circle';
  }
  
  getLineStatusText(): string {
    const status = this.lineStatus();
    const texts: Record<string, string> = {
      'operando_normalmente': 'Todas as máquinas em operação normal',
      'operacao_parcial': `${this.getMachinesByStatus('running').length}/${this.machines().length} máquinas operando`,
      'operacao_critica': 'Operação crítica - Verifique as máquinas',
      'totalmente_parado': 'Linha totalmente parada',
      'pausado': 'Linha pausada pelo operador'
    };
    return texts[status] || 'Status desconhecido';
  }
  
  // ========== LOGOUT ==========
  logout(): void {
    this.authService.logout();
  }
}